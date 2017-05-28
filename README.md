# flashttp
___

## Lightweight Promise based Http Client 
___

# Features 
+ Update a web page without reloading the page
+ Request data from a server
+ Receive data from a server
+ Send data to a server
+ Supports [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

___

# Installing 

 ```npm install flashttp```

___

 # Example 

> ### Performing a GET request

```javascript
/**
* For the GET request you will need to provide the URL(GET or GET/:ID) and Optionally Headers
e.g. { 'Content-Type': 'application/json , 'Authorization' : 'TOKEN'}
**/ 

flashttp.Get("URL",{
    'Content-Type': 'application/json',
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
})
//Response Object { Response: Object, Status: 200, StatusMessage: "Success -> OK", Headers: Object }
```

> ### Performing a POST request

```javascript
/**
* For the POST request you will need to provide the URL , Object(BODY) and Optionally Headers
e.g. { 'Content-Type': 'application/json , 'Authorization' : 'TOKEN'}
**/ 

flashttp.Post("URL",{
    'Content-Type': 'application/json',
  },{}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
})
//Response Object { Response: Object, Status: 200, StatusMessage: "Success -> OK", Headers: Object }
```

> ### Performing a PUT request

```javascript
/**
* For the PUT request you will need to provide the URL(PUT or PUT/:ID) , Object(BODY) and Optionally Headers
e.g. { 'Content-Type': 'application/json , 'Authorization' : 'TOKEN'}
**/ 

flashttp.Put("URL",{
    'Content-Type': 'application/json',
  },{}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
})
//Response Object { Response: Object, Status: 200, StatusMessage: "Success -> OK", Headers: Object }
```

> ### Performing a PATCH request

```javascript
/**
* For the PATCH request you will need to provide the URL(PATCH or PATHC:ID) , Object(BODY) and Optionally Headers
e.g. { 'Content-Type': 'application/json , 'Authorization' : 'TOKEN'}
**/ 

flashttp.Patch("URL",{
    'Content-Type': 'application/json',
  },{}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
})
//Response Object { Response: Object, Status: 200, StatusMessage: "Success -> OK", Headers: Object }
```
> ### Performing a DELETE request

```javascript
/**
* For the DELETE request you will need to provide the URL(DELETE or DELETE/:ID) , Optionally a Object(BODY) and Optionally Headers
e.g. { 'Content-Type': 'application/json , 'Authorization' : 'TOKEN'}
**/ 

flashttp.Delete("URL",{
    'Content-Type': 'application/json',
  },{}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
})
//Response Object { Response: Object, Status: 200, StatusMessage: "Success -> OK", Headers: Object }
```
