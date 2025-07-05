package com.kiemle.expenses

import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import android.view.WindowManager
import android.view.Window

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        webView.settings.domStorageEnabled = true
        webView.settings.javaScriptEnabled = true
        webView.webViewClient = WebViewClient()

        // **1. Statusleisten-Hintergrundfarbe setzen**
        val window: Window = this.window
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            // Löscht das Flag, das die Statusleiste durchscheinend macht (falls gesetzt)
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
            // Fügt das Flag hinzu, das es uns erlaubt, die Farbe der Statusleiste zu zeichnen
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)

            // Setze eine Farbe für den Statusleistenhintergrund
            // Zum Testen eine dunkle Farbe, damit weiße Icons sichtbar werden:
            window.statusBarColor = Color.BLACK
            // Oder eine Farbe aus deinen R.color Ressourcen:
            // window.statusBarColor = ContextCompat.getColor(this, R.color.meine_statusleisten_farbe)
            // Für echte Transparenz (wenn der Inhalt dahinter den Kontrast liefert):
            // window.statusBarColor = Color.TRANSPARENT
        }

        webView.loadUrl(BuildConfig.WEBVIEW_URL)
    }
}
