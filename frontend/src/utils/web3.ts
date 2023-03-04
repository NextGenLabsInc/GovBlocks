import { ethers } from "ethers";
import { Alchemy } from "alchemy-sdk";

import { getContracts } from "@/utils/contracts";

import { uploadContent } from "./ipfs";

const contracts = getContracts("mumbai");
const ethersProvider = new ethers.providers.JsonRpcProvider(contracts.rpcUrl);

const getGasTokenSymbol = () => {
	return contracts.walletConfig.nativeCurrency.symbol;
};

const getNftStorageURI = (ipfsURI: string) => {
	let nftStorageURI = "";
	if (ipfsURI && ipfsURI.includes("ipfs://")) {
		const updatedIPFSURI = ipfsURI.replace(/^ipfs?:\/\//, "");
		nftStorageURI = `https://nftstorage.link/ipfs/${updatedIPFSURI}`;
	}
	return nftStorageURI;
};

const getIPFSJSONData = async (ipfsURI: string) => {
	const nftStorageURI = getNftStorageURI(ipfsURI);
	const ipfsData = await fetch(nftStorageURI);
	const jsonData = await ipfsData.json();
	return jsonData;
};

const getBrandName = async () => {
	const brand = new ethers.Contract(
		contracts.diamondAddress,
		contracts.brandFacetAbi,
		ethersProvider
	);

	return await brand.getBrandName();
};

const getBrandURI = async () => {
	const brand = new ethers.Contract(
		contracts.diamondAddress,
		contracts.brandFacetAbi,
		ethersProvider
	);

	const brandURI = await brand.getBrandURI();
	const updatedURI = brandURI.replace(/^https?:\/\//, "");
	return updatedURI;
};

const getBrandMetadata = async () => {
	const brand = new ethers.Contract(
		contracts.diamondAddress,
		contracts.brandFacetAbi,
		ethersProvider
	);

	const brandMetadataURI = await brand.getBrandMetadataURI();
	return getIPFSJSONData(brandMetadataURI);
};

const getBrandCalldatas = async (name: string, description: string) => {
	const brand = new ethers.Contract(
		contracts.diamondAddress,
		contracts.brandFacetAbi,
		ethersProvider
	);

	const brandMetadataURI = await brand.getBrandMetadataURI();
	let metadataJSON = getIPFSJSONData(brandMetadataURI);

	if (metadataJSON) {
		if ("name" in metadataJSON) metadataJSON.name = name;
		if ("description" in metadataJSON)
			metadataJSON.description = description;
	}

	const newMetadataURI = await uploadContent(metadataJSON);

	const calldatas = [];
	calldatas.push(brand.interface.encodeFunctionData("setBrandName", [name]));
	calldatas.push(
		brand.interface.encodeFunctionData("setBrandMetadataURI", [
			newMetadataURI,
		])
	);

	return calldatas;
};

const getRoles = async () => {};

const getMembershipNFTImage = async () => {
	const membership = new ethers.Contract(
		contracts.membershipAddress,
		contracts.membershipContractAbi,
		ethersProvider
	);

	const membershipMetadata = await getIPFSJSONData(
		await membership.tokenURI(0)
	);
	const nftImage = await getNftStorageURI(membershipMetadata.image);
	return nftImage;
};

const getMembershipMintPrice = async () => {
	const membership = new ethers.Contract(
		contracts.diamondAddress,
		contracts.membershipFacetAbi,
		ethersProvider
	);

	const mintPrice = await membership.getMintPrice(
		contracts.membershipAddress
	);

	return ethers.utils.formatEther(mintPrice);
};

const getMembershipMaxSupply = async () => {
	const membership = new ethers.Contract(
		contracts.diamondAddress,
		contracts.membershipFacetAbi,
		ethersProvider
	);

	const maxSupply = await membership.getMaxSupply(
		contracts.membershipAddress
	);
	return maxSupply.toNumber();
};

const getMembershipTotalSupply = async () => {
	const membership = new ethers.Contract(
		contracts.diamondAddress,
		contracts.membershipFacetAbi,
		ethersProvider
	);

	const totalSupply = await membership.getMaxSupply(
		contracts.membershipAddress
	);
	return totalSupply.toNumber();
};

const mintMembership = async (signer: any, address: any) => {
	const membership = new ethers.Contract(
		contracts.diamondAddress,
		contracts.membershipFacetAbi,
		signer
	);

	const options = { value: ethers.utils.parseEther("0.01") };
	await membership.mint(contracts.membershipAddress, address, options);
};

const getMembershipNFTs = async (address: any) => {
	const membership = new ethers.Contract(
		contracts.membershipAddress,
		contracts.membershipContractAbi,
		ethersProvider
	);

	const balance = await membership.balanceOf(address);
	return balance.toNumber();
};

const getMembershipCalldatas = async (maxSupply: number, mintPrice: number) => {
	const brand = new ethers.Contract(
		contracts.diamondAddress,
		contracts.membershipFacetAbi,
		ethersProvider
	);

	const calldatas = [];
	calldatas.push(
		brand.interface.encodeFunctionData("setMaxSupply", [
			contracts.membershipAddress,
			maxSupply,
		])
	);

	calldatas.push(
		brand.interface.encodeFunctionData("setMintPrice", [
			contracts.membershipAddress,
			ethers.utils.parseEther(String(mintPrice)),
		])
	);

	return calldatas;
};

const getProposals = async (proposalCount: number) => {
	const governance = new ethers.Contract(
		contracts.diamondAddress,
		contracts.governanceAFacetAbi,
		ethersProvider
	);

	const proposals = [];
	for (let i = 1; i <= proposalCount; i++) {
		const proposal = await governance.getProposal(i);
		proposals.push(proposal);
	}

	return proposals;
};

const getProposal = async (proposalId: number) => {
	const governance = new ethers.Contract(
		contracts.diamondAddress,
		contracts.governanceAFacetAbi,
		ethersProvider
	);

	const proposal = await governance.getProposal(proposalId);
	console.log(proposal);
	return proposal;
};

const getProposalCount = async () => {
	const governance = new ethers.Contract(
		contracts.diamondAddress,
		contracts.governanceAFacetAbi,
		ethersProvider
	);

	const proposalCount = await governance.getProposalCount();
	return proposalCount.toNumber();
};

const createProposal = async (signer: any, content: any) => {
	const governance = new ethers.Contract(
		contracts.diamondAddress,
		contracts.governanceAFacetAbi,
		signer
	);

	const metadataURI = await uploadContent(content);
	console.log(metadataURI);
	await governance.propose([], [], [], [], metadataURI);
};

const createProposalWithInstructions = async (
	signer: any,
	content: any,
	calldatas: any[]
) => {
	const governance = new ethers.Contract(
		contracts.diamondAddress,
		contracts.governanceAFacetAbi,
		signer
	);

	const metadataURI = await uploadContent(content);
	console.log(metadataURI);

	const targets = [];
	const values = [];
	const signatures = [];

	console.log(calldatas);
	for (const calldata of calldatas) {
		targets.push(contracts.diamondAddress);
		values.push(0);
		signatures.push("");
	}

	await governance.propose(
		targets,
		values,
		signatures,
		calldatas,
		metadataURI
	);
};

const castVote = async (signer: any, proposalId: number, vote: number) => {
	const governance = new ethers.Contract(
		contracts.diamondAddress,
		contracts.governanceAFacetAbi,
		signer
	);

	await governance.castVote(proposalId, vote);
};

const endVotingTest = async (signer: any, proposalId: number) => {
	const governance = new ethers.Contract(
		contracts.diamondAddress,
		contracts.governanceAFacetAbi,
		signer
	);

	await governance.endVotingTest(proposalId);
};

const getVoteSupport = async () => {};

const getQuorum = async () => {};

const getProposalDuration = async () => {};

const getVotingStreak = async () => {};

const getVotingStreakMultiplier = async () => {};

const isVotingFinalized = async (proposalId: number) => {
	const governance = new ethers.Contract(
		contracts.diamondAddress,
		contracts.governanceAFacetAbi,
		ethersProvider
	);

	await governance.isVotingFinalized(proposalId);
};

const executeProposal = async (signer: any, proposalId: number) => {
	const governance = new ethers.Contract(
		contracts.diamondAddress,
		contracts.governanceAFacetAbi,
		signer
	);

	await governance.execute(proposalId);
};

const getVoteCount = async (proposalId: number) => {
	const governance = new ethers.Contract(
		contracts.diamondAddress,
		contracts.governanceAFacetAbi,
		ethersProvider
	);

	const voteCount = await governance.getTotalVotes(proposalId);
	console.log(voteCount);
	return voteCount.toNumber();
};

export {
	getGasTokenSymbol,
	castVote,
	createProposal,
	createProposalWithInstructions,
	endVotingTest,
	executeProposal,
	getBrandCalldatas,
	getBrandMetadata,
	getBrandName,
	getBrandURI,
	getIPFSJSONData,
	getMembershipCalldatas,
	getMembershipMaxSupply,
	getMembershipMintPrice,
	getMembershipNFTImage,
	getMembershipTotalSupply,
	mintMembership,
	getMembershipNFTs,
	getNftStorageURI,
	getProposal,
	getProposalCount,
	getProposalDuration,
	getProposals,
	getQuorum,
	getRoles,
	getVoteCount,
	getVoteSupport,
	getVotingStreak,
	getVotingStreakMultiplier,
};
