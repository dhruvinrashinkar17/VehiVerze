import 'package:flutter/material.dart';

class OrderManagementPage extends StatelessWidget {
  const OrderManagementPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Order Management')),
      body: const Center(
        child: Text('Order Management Page'),
      ),
    );
  }
}
