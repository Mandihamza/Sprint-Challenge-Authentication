What is the purpose of using sessions?

> Sessions allow the server to temporarily store user state such as logged in and logged out during a predetermined period of time, or when a user closes their browser or leaves the site.
 
What does bcrypt do to help us store passwords in a secure manner.

> a: bcrypt is an adaptive password hashing algorithm with a time complexity varient which allows developers to determine how many times bcrypt should hash a password.  Increasing the time complexity increases the time that bcrypt spends hashing the password. This method slows down the rate at which password crackers can try new passwords.
 
What does bcrypt do to slow down attackers?

> bcrypt introduces a time complexity that slows down login attempts.
 
What are the three parts of the JSON Web Token?

>The header, payload, and signature.

>Header: Contains the token type and signing algorithm such as:

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

>Payload: Contains claims which are statements about the user such as:

```
{
  "sub": "1234567890",
  "name": "Lisa Simpson",
  "admin": true
}
```

> Signature: A way to verify a message has not been tampered with, and with the use of a token - that a sender is who they claim to be.