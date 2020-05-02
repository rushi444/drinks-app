# Drinks App(Instagram but for cocktails)

### Tasks
  - [x] User in server context
  - [x] Ability to create recipes
  - [x] Can login and view liked, and added recipes
  - [x] Search for drinks or ingredients
  - [x] Infinite scroll & pagination
  - [x] User can like drinks
  - [x] Computed queries(userLiked, numberOfLikes, likedIds)
  - [x] User's can leave comments
  - [x] Update ui when new comment/Subscription to drinks comments
  - [ ] Clean up styling
  - [ ] Delete user's own comments
  - [ ] Unlike recipes
  - [ ] Cascade Deletes(Currently disabled, using Prisma 2 experimental)


### How to use 
  #### Server
    - cd into backend
    - yarn 
    - Create .env file in /prisma with an environment variable, if using demo(DATABASE_URL="postgres://eruktrvj:27ySTS8ccMkok1moF2Oi7NVD5ktb5KC1@drona.db.elephantsql.com:5432/eruktrvj")
    - yarn prisma migrate save --experimental, yarn prisma migrate up --experimental(If using your own database)
    - yarn generate
    - yarn run dev
  #### Client
    - cd into frontend
    - yarn 
    - yarn start
