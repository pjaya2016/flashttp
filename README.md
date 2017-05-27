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
let flashttp = require('flashttp');

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
```

> ### Performing a PUT request

```
```

> ### Performing a PATCH request

```
```

> ### Performing a DELETE request

```
```
