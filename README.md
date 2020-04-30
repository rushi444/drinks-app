# Drinks App(Instagram but for cocktails)

### Tasks
  - [x] User in server context
  - [x] Ability to create recipes
  - [x] Can login and view liked, and added recipes
  - [x] Infinite scroll & pagination
  - [x] User can like drinks
  - [x] Computed queries(userLiked, numberOfLikes, likedIds)
  - [ ] User's can leave comments
  - [ ] Subscription to drinks comments


### How to use 
  #### Server
    - cd into backend
    - yarn 
    - Create .env file in /prisma with an environment variable, if using demo( DATABASE_URL="postgres://eruktrvj:27ySTS8ccMkok1moF2Oi7NVD5ktb5KC1@drona.db.elephantsql.com:5432/eruktrvj")
    - yarn prisma migrate save --experimental, yarn prisma migrate up --experimental(If using your own database)
    - yarn generate
    - yarn run dev
  #### Client
    - cd into frontend
    - yarn 
    - yarn start
