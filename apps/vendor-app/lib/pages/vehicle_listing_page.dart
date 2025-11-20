import 'package:flutter/material.dart';

class VehicleListingPage extends StatelessWidget {
  const VehicleListingPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Vehicle Listings')),
      body: const Center(
        child: Text('Vehicle Listings Page'),
      ),
    );
  }
}
