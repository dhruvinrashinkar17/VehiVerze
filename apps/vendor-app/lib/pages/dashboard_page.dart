import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vehiverze_vendor_app/pages/vehicle_listing_page.dart';
import 'package:vehiverze_vendor_app/pages/service_management_page.dart';
import 'package:vehiverze_vendor_app/pages/order_management_page.dart';
import 'package:vehiverze_vendor_app/pages/profile_page.dart';
import 'package:vehiverze_vendor_app/providers/auth_provider.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('VehiVerze Vendor Dashboard')),
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            const DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text('VehiVerze Vendor'),
            ),
            ListTile(
              title: const Text('Vehicle Listings'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const VehicleListingPage()),
                );
              },
            ),
            ListTile(
              title: const Text('Service Management'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const ServiceManagementPage()),
                );
              },
            ),
            ListTile(
              title: const Text('Order Management'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const OrderManagementPage()),
                );
              },
            ),
            ListTile(
              title: const Text('Profile'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const ProfilePage()),
                );
              },
            ),
            ListTile(
              title: const Text('Logout'),
              onTap: () async {
                await context.read<AuthProvider>().signOut();
                Navigator.of(context).pushReplacementNamed('/');
              },
            ),
          ],
        ),
      ),
      body: const Center(
        child: Text('Welcome to VehiVerze Vendor Dashboard'),
      ),
    );
  }
}
