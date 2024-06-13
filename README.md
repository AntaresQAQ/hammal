# Hammal

Hammal is a Docker registry mirror tool that runs on cloudflare workers. It is used to solve the problem that the official Docker images in mainland China are inaccessible.

## Usage

You should prepare:

- a domain
- a Cloudflare account

### Setup environment

Install [Node.js](https://nodejs.org/en/download) and [PNPM](https://pnpm.io/installation)

Download or clone this git repo, and open the repo in your shell.

Install dependencies with command:

```sh
pnpm install
```

### Authenticate

Login your Cloudflare account with command:

```sh
npx wrangler login
```

Complete each step on the automatically opened web page until the login is successful.

Get your account ID with command:
```sh
npx wrangler whoami
```

### Create KV namespace

Create a KV namespace as cache on Cloudflare with command:

```sh
npx wrangler kv:namespace create hammal_cache
```

You will get an ID of the new KV namespace you created.

### Create a config file

Copy `wrangler.toml.sample` as `wrangler.toml` and edit it.

Replace `<your account id>` and `<your KV namespace id>` with the account ID and KV namespace ID obtained above.

Tips: you can also update a custom name.

### Deploy

Run the command to deploy the Worker:
```sh
pnpm run deploy
```

Open your Worker dashboard on Cloudflare. Go to **Setting > Triggers > Custom Domains**. Add a custom domain for your Worker. This is necessary because the domain `*.workers.dev` is blocked by GFW.