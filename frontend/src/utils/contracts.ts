import { Network } from "alchemy-sdk";

const abiDiamondCutFacet = require("./abi/DiamondCutFacet.json");
const abiDiamondLoupeFacet = require("./abi/DiamondLoupeFacet.json");
const abiBrandFacet = require("./abi/BrandFacet.json");
const abiOwnershipFacet = require("./abi/OwnershipFacet.json");
const abiMembershipFacet = require("./abi/MembershipFacet.json");
const abiGovernanceAFacet = require("./abi/GovernanceAFacet.json");

const abiMembershipContract = require("./abi/MembershipContract.json");

const getContracts = (chain: String) => {
	const goerli = {
		chain: "goerli",
		chainId: 5,
		chainIdHex: "0x5",
		chainName: "Goerli Testnet",
		rpcUrl: "https://eth-goerli.g.alchemy.com/v2/CJ0p2QdZRojuoMvpsiQmMKiRojJXSGvP",
		explorerUrl: "https://goerli.etherscan.io/",
		walletConfig: {
			chainId: "0x5",
			chainName: "Goerli",
			rpcUrls: ["https://goerli.infura.io/v3/"],
			nativeCurrency: {
				name: "Ethereum",
				symbol: "ETH",
				decimals: 18,
			},
			blockExplorerUrls: ["https://goerli.etherscan.io"],
		},
		diamondAddress: "",
		membershipAddress: "",
		diamondCutFacetAddress: "",
		governanceAFacetAddress: "",
		governanceBFacetAddress: "",
		diamondCutFacetAbi: abiDiamondCutFacet,
		diamondLoupeFacetAbi: abiDiamondLoupeFacet,
		brandFacetAbi: abiBrandFacet,
		ownershipFacetAbi: abiOwnershipFacet,
		membershipFacetAbi: abiMembershipFacet,
		membershipContractAbi: abiMembershipContract,
		governanceAFacetAbi: abiGovernanceAFacet,
	};

	const mumbai = {
		chain: "mumbai",
		chainId: 80001,
		chainIdHex: "0x13881",
		chainName: "Polygon Mumbai Testnet",
		rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/5ARhjf605RhTL4Umk6keHUxzUu9yI9jC",
		explorerUrl: "https://mumbai.polygonscan.com/",
		walletConfig: {
			chainId: "0x13881",
			chainName: "Polygon Mumbai",
			rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
			nativeCurrency: {
				name: "Matic",
				symbol: "MATIC",
				decimals: 18,
			},
			blockExplorerUrls: ["https://mumbai.polygonscan.com"],
		},
		diamondAddress: "0xEf0035F4e9892DB46472BF840BA4B87227D050D8",
		membershipAddress: "0x3C5bdE2d82B2A652D6E800015BFffF5f9f74b284",
		diamondCutFacetAddress: "0xa7597f4BFfDB74EB4D2eBed09356E846e33ABBa3",
		governanceAFacetAddress: "0xa60ae68Fa93C43f26e9E7Ec0E4E9FbFB15c078c2",
		governanceBFacetAddress: "0x6fE8B2A0BdDa97E5618c203F466EFcC211076E1b",
		diamondCutFacetAbi: abiDiamondCutFacet,
		diamondLoupeFacetAbi: abiDiamondLoupeFacet,
		brandFacetAbi: abiBrandFacet,
		ownershipFacetAbi: abiOwnershipFacet,
		membershipFacetAbi: abiMembershipFacet,
		membershipContractAbi: abiMembershipContract,
		governanceAFacetAbi: abiGovernanceAFacet,
	};

	const baseGoerli = {
		chain: "baseGoerli",
		chainId: 84531,
		chainIdHex: "0x14A33",
		chainName: "Base Goerli Testnet",
		rpcUrl: "https://wild-virulent-field.base-goerli.discover.quiknode.pro/0a78f06651c877c081a45e6681866ecf05181827",
		explorerUrl: "https://goerli.basescan.org/",
		walletConfig: {
			chainId: "0x14A33",
			chainName: "Base Goerli",
			rpcUrls: ["https://goerli.base.org"],
			nativeCurrency: {
				name: "Ethereum",
				symbol: "ETH",
				decimals: 18,
			},
			blockExplorerUrls: ["https://goerli.basescan.org"],
		},
		diamondAddress: "",
		membershipAddress: "",
		diamondCutFacetAddress: "",
		governanceAFacetAddress: "",
		governanceBFacetAddress: "",
		diamondCutFacetAbi: abiDiamondCutFacet,
		diamondLoupeFacetAbi: abiDiamondLoupeFacet,
		brandFacetAbi: abiBrandFacet,
		ownershipFacetAbi: abiOwnershipFacet,
		membershipFacetAbi: abiMembershipFacet,
		membershipContractAbi: abiMembershipContract,
		governanceAFacetAbi: abiGovernanceAFacet,
	};

	const bsc = {
		chain: "Smart Chain - Testnet",
		chainId: 97,
		chainIdHex: "0x61",
		chainName: "Binance Smartchain testnet",
		rpcUrl: "https://special-long-star.bsc-testnet.discover.quiknode.pro/72407a9fdc8bdfb3a8971c536729631327b81b15/",
		explorerUrl: "https://mumbai.polygonscan.com/",
		walletConfig: {
			chainId: "0x61",
			chainName: "Binance Smartchain testnet",
			rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
			nativeCurrency: {
				name: "tBNB",
				symbol: "tBNB",
				decimals: 18,
			},
			blockExplorerUrls: ["https://testnet.bscscan.com"],
		},
		diamondAddress: "0xe514086c7eA295FDa634B10661A7F6ceCEFD0947",
		membershipAddress: "0xad25740d6D4Bd503cEa9926a88C2f96Bd5532332",
		diamondCutFacetAddress: "",
		governanceAFacetAddress: "",
		governanceBFacetAddress: "",
		diamondCutFacetAbi: abiDiamondCutFacet,
		diamondLoupeFacetAbi: abiDiamondLoupeFacet,
		brandFacetAbi: abiBrandFacet,
		ownershipFacetAbi: abiOwnershipFacet,
		membershipFacetAbi: abiMembershipFacet,
		membershipContractAbi: abiMembershipContract,
		governanceAFacetAbi: abiGovernanceAFacet,
	};

	const local = {
		chain: "local",
		chainId: 31337,
		chainIdHex: "0x13881",
		chainName: "Local",
		rpcUrl: "http://localhost:8545",
		explorerUrl: "None",
		walletConfig: {
			chainId: "0x13881",
			chainName: "Local",
			rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
			nativeCurrency: {
				name: "Matic",
				symbol: "MATIC",
				decimals: 18,
			},
			blockExplorerUrls: ["https://mumbai.polygonscan.com"],
		},
		diamondAddress: "",
		membershipAddress: "",
		diamondCutFacetAddress: "",
		governanceAFacetAddress: "",
		governanceBFacetAddress: "",
		diamondCutFacetAbi: abiDiamondCutFacet,
		diamondLoupeFacetAbi: abiDiamondLoupeFacet,
		brandFacetAbi: abiBrandFacet,
		ownershipFacetAbi: abiOwnershipFacet,
		membershipFacetAbi: abiMembershipFacet,
		membershipContractAbi: abiMembershipContract,
		governanceAFacetAbi: abiGovernanceAFacet,
	};

	switch (chain) {
		case "goerli":
			return goerli;
		case "mumbai":
			return mumbai;
		case "baseGoerli":
			return baseGoerli;
		case "bsc":
			return bsc;
		case "local":
			return local;
		default:
			return local;
	}
};

export { getContracts };
