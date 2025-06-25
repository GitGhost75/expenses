package com.kiemle.expenses

import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        // Zeigt den systemweiten SplashScreen (Android 12+)
        installSplashScreen()

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Optional: für immersive Edge-to-Edge Darstellung (ab API 30)
        enableEdgeToEdge()

        webView = findViewById(R.id.webView)
        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.webViewClient = WebViewClient() // sorgt dafür, dass Links im WebView bleiben

        // Lade deine App-URL
        webView.loadUrl(BuildConfig.WEBVIEW_URL)
    }
}
