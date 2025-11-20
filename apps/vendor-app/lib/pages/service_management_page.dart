import 'package:flutter/material.dart';

class ServiceManagementPage extends StatelessWidget {
  const ServiceManagementPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Service Management')),
      body: const Center(
        child: Text('Service Management Page'),
      ),
    );
  }
}
