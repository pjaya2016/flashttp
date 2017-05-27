# flashttp
___

## Lightweight Promise based Http Client for the front-end (TESTING)
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

```
flashttp.Get("URL",{
    'Content-Type': 'application/json',
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
})
```

> ### Performing a POST request

```
flashttp.Post("URL",{
    'Content-Type': 'application/json',
  },{}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
})
```

> ### Performing a PUT request

```
flashttp.Put("URL",{
    'Content-Type': 'application/json',
  },{}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
})
```

> ### Performing a PATCH request

```
flashttp.Patch("URL",{
    'Content-Type': 'application/json',
  },{}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
})
```

> ### Performing a DELETE request

```
flashttp.Delete("URL",{
    'Content-Type': 'application/json',
  },{}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
})
```
