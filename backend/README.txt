# Running backend
npm install
npm start

#deploying backend
zip up backend, log into aws console and upload to elastic beanstalk

# Elastic search sync (need pem file -> elastic-search.pem, must sync everytime you make a new collection or delete collection)
- sign in to ec2 instance

- go into screen

# for redeploy dev
screen -r 11082

# for redploy prod
screen -r 13700

# detach 
Ctrl+a
Ctrl+d


# Code walkthrough
app.js is the meat of the server
In the app directory, there are two subdirectories: models and routes
1) models
- Has our MongoDB schemas. See babyUser.js for simple example of a schema and user.js for a more sophisticated example
2) routes 
- These are our controllers and endpoints for the server
- Naming convention: name it the same as its model i.e. for the babyUser endpoints, there is a babyUser.js model and a babyUser.js route
