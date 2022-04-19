
# NFT as Auth Example Project

__Goal:__ Limit access to exclusive content to owners of a specified NFT.

In this project the user will connect their MetaMask wallet. If they own the specified NFT they will see "ACCESS GRANTED" and if they don't they will see "ACCESS DENIED."

A real-world use case for this project: If you minted a collection of NTFs and wanted to create a site for the NFT owners with exlusive perks, content, etc., this would be a way to authenticate users.


## Tech Stack

- [Next.js](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Etherscan API](https://docs.etherscan.io/)
- Axios
- Zustand



## Run Locally

### 1. Intallation
Clone the project

```bash
  git clone https://github.com/mondorobot/consensys.lootbox.auth.project.next.git
```

Go to the project directory

```bash
  cd consensys.lootbox.auth.project.next
```

Install dependencies

```bash
  yarn
```

### 2. Environment Variables
Create environment variables file
```bash
  cp .env .env.local
```

You'll need to sign up and get an etherscan.io API key:

  1 - [Create an Etherscan account](https://docs.etherscan.io/getting-started/creating-an-account) 
  
  2 - [Get an API Key](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics)

Add your API Key to the `.env.local` file
```bash
  # .env.local

  ETHERSCAN_API_TOKEN=insert-your-api-key-here
```

Add the NFT contract address that you want to authenticate users with. Note that because this project utilizes the Etherscan API the contract used to verify users must be on the __ethereum network__.
```bash
  # .env.local

  ETHERSCAN_API_TOKEN=insert-your-api-key-here
  CONTRACT_ADDRESS=0x...
```

### 3. Run the Project

```bash
  yarn dev
```
Go to http://localhost:3000


## Component Breakdown

`pages/index.tsx`
  - Home page Component
  - imports Message.tsx and Button.tsx components
  - has useEffect that checks on page load if the user has already connected their wallet, and checks for account changes (disconnect wallet, change accounts within wallet)

`pages/api/auth.ts`
  - Next.js API file
  - Making a `POST` request to `http://localhost:3000/api/auth` with the wallet public address will call the Etherscan API and return the token balance

`helpers/store.ts`
  - This file sets up our zustand store. [Zustand](https://github.com/pmndrs/zustand) is a "small, fast and scalable bearbones state-management solution using simplified flux principles." Basically an easier, lighter-weight Redux.

`components/Button.tsx`
  - Button component that changes depending on the users actions
  - Button onClick functions for each state of the button

`components/Message.tsx`
  - Message component displays the primary text to the user, which changes depending on the users actions
