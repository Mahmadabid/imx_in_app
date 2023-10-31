# Immutable Passport Integration
In this guide, you will learn how to integrate immutable passport with your app.
#### Github Repo and Sample App
* [Github Repo](https://github.com/Mahmadabid/imx_in_app)

* [Sample App](https://imxinapp.vercel.app/)
### Prerequisites 
1. [Node.js](https://nodejs.org/)
2. [Immutable developer hub account](https://hub.immutable.com/)
3. You can use framework of your choice, but this guide will go with [Nextjs](https://nextjs.org/) a framework of [Reactjs](https://react.dev/)
4. [Git](https://git-scm.com/)

Follow these steps
### 1. Create a simple application or clone this repository 
You can create a new application using this command


```ruby 
npx create-next-app@latest
```
Or you can clone this repository using this command
```ruby
git clone https://github.com/Mahmadabid/imx_in_app
```

### 2. Register your application on Immutable developer hub
* Visit the [Immutable developer hub](https://hub.immutable.com/)
* Login to your app or create a new one if you don't have
![Immutable hub login page](https://github.com/Mahmadabid/imx_in_app/images/immutablehub.png)
* Click **Add Project**
* Give your Project a name and select **Immutable ZkEVM** and click **create**
![View of Project](https://github.com/Mahmadabid/imx_in_app/images/project.png)
* After creating give an environment name and click on testnet
* In **Passport** Tab, Create a default client
![Client](https://github.com/Mahmadabid/imx_in_app/images/client.png)
* Save these details

### 3. Install the dependencies
If you have cloned the repo use this command
```ruby
npm install
```
If you have created a new app use this command
```ruby
npm install -D @imtbl/sdk
```
