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
flashttp.Delete("URL",{
    'Content-Type': 'application/json',
  },{}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
})
//Response Object { Response: Object, Status: 200, StatusMessage: "Success -> OK", Headers: Object }
```
