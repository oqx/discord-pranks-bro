# Description
The worst Club Penguin clone you've never seen.

## Setup
This project uses `dotenv`. To get started, rename `.env.default` to `.dev`.

### DISCORD_TOKEN
This is the token for your discord bot. Not to be confused with `secret` or `public key`. This can be retrieved within the Discord developer portal after you've selected your bot.

### DISCORD_AUTHOR_ID
This is _your_ Discord ID -- not to be confused with your display name. It's more of a UUID rather than a `<screenName>#2133` scheme. You'll need to go to Discord Settings -> Advanced -> Enable Developer Mode. Then proceed to your Discord profile and select the very subtle kabob menu next to your avatar. There you can copy your ID.

## Install
```sh
npm i
```

## Run
```sh
npm run start
```

## Build
```sh
npm run build
```

## FAQ

**Does it use Redis for comment caching?**

False. This project uses a simple key/value caching scheme (singleton) that lives in the node app. It doesn't use Redis, particularly because I designed it to run on 1.6ghz dual core processor with 4gb of memory that is currently being hammered with other servers.

**Can a Guild configure its settings?**

Not at the moment, but I did build a `ChannelSettings` singleton cache that can be set. I just haven't added commands for it yet.

