# Just Chattin

## Description
Just Chattin is a chat application that uses socket.io to allow two users to connect and chat with the option of a few different rooms. Socket.io is a program that helps create chat programs by creating a WebSocket, which allows for a full duplex and low latency channel to be formed between the user and the server. This allows for a fast and efficient chat program. The program also allows users to sign up with a password and username to log in. The password stored is hashed with Bcrypt for user safety.

## Installation
npm install, then do mysql -u root -p and do source db/schema.sql, then quit and npm start.

## Usage
When you open the app, you will be greeted by a login page:
>>screenshot of login page 
From there if you do not have an existing account you will have to use the redirect to the sign up page, there you can make an account, and will either be redirected to the login page automatically or select to redirect manually. Sign up page pictured below:
>>screenshot of signup
Once you've signed up and logged in you will reach the Room Select page. From here you will have the option to select one of four rooms: Coding, Soccer, Memes, and . Selecting one of these and clicking "join room" will put you into a chat room. Example of the room select page below:
>>screenshot of room seelct
Then you are in the chat room! From here you can see on the left hand menu what room you are in and who is in it with you. near the bottom you can type a message and send it, and youll see it pop up in the middle section. Anybody else in the room will also see the message and if they respond the vice versa will happen. Chat room displayed below:
>>screenshot of chat room

## Credits
Juan Gomez: https://github.com/jcgom3
Vinh Tran: https://github.com/MeeMofu
Ian Englehart: https://github.com/ienglehart
Add more to this?

## Liscense 
MIT License

Copyright (c) [2020] [Juan Gomez, Vinh Tran, Ian Englehart]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
