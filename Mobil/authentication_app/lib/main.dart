import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/auth_provider.dart';
import 'screens/splash_screen.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => AuthProvider(),
      child: MaterialApp(
        title: 'Vücut Kitle Endeksi Hesaplama',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          scaffoldBackgroundColor: const Color(0xFF000080),
          colorScheme: const ColorScheme.dark().copyWith(
            primary: Colors.white,
            secondary: Colors.white70,
          ),
        ),
        home: const SplashScreen(),
      ),
    );
  }
}
