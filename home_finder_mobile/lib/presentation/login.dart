import "package:flutter/material.dart";

class Login extends StatelessWidget {
  const Login({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(backgroundColor: Colors.blue),
      body: Container(
        padding: const EdgeInsets.all(8),
        child: Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
          Container(
            height: 300,
            decoration: const BoxDecoration(
                image: DecorationImage(
                    image: AssetImage('assets/login-icon.png'),
                    fit: BoxFit.contain)),
          ),
          const Padding(
            padding: EdgeInsets.all(10),
            child: Text(
              'Signin',
              style: TextStyle(
                fontSize: 20,
              ),
            ),
          ),
          TextFormField(
            decoration: InputDecoration(
              labelText: 'Username',
              enabledBorder: OutlineInputBorder(
                borderSide: const BorderSide(width: 1, color: Colors.grey),
                borderRadius: BorderRadius.circular(5),
              ),
              focusedBorder: OutlineInputBorder(
                borderSide: const BorderSide(width: 1, color: Colors.blue),
                borderRadius: BorderRadius.circular(5),
              ),
            ),
          ),
          const SizedBox(
            height: 10,
          ),
          TextFormField(
            decoration: InputDecoration(
              labelText: 'Password',
              enabledBorder: OutlineInputBorder(
                borderSide: const BorderSide(width: 1, color: Colors.grey),
                borderRadius: BorderRadius.circular(5),
              ),
              focusedBorder: OutlineInputBorder(
                borderSide: const BorderSide(width: 1, color: Colors.blue),
                borderRadius: BorderRadius.circular(5),
              ),
            ),
          ),
          ElevatedButton(
            onPressed: () => {},
            style: ElevatedButton.styleFrom(
                minimumSize: const Size.fromHeight(60),
                shape: const RoundedRectangleBorder(
                    borderRadius: BorderRadius.all(Radius.circular(5)))),
            child: const Text("signin"),
          )
        ]),
      ),
    );
  }
}
