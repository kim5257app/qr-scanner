package io.kim5257.app.qrscanner;

import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.WebView;
import android.widget.Toast;

import com.getcapacitor.BridgeActivity;

import java.net.URI;
import java.net.URISyntaxException;

public class MainActivity extends BridgeActivity {
    private final String TAG = "MainActivity";

    private long backPressedTime = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(EventPlugin.class);
        registerPlugin(com.getcapacitor.community.admob.AdMob.class);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);

        ((EventPlugin)getBridge().getPlugin("Event").getInstance()).onFocusChanged(hasFocus);
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK) {
            WebView webView = findViewById(R.id.webview);

            Log.d(TAG, "canGoBack:" + webView.canGoBack());
            Log.d(TAG, "url:" + webView.getUrl());

            try {
                URI uri = new URI(webView.getUrl());
                Log.d(TAG, "path:" + uri.getPath());

                if (webView.canGoBack()) {
                    webView.goBack();
                } else if (!uri.getPath().equals("/")) {
                    webView.evaluateJavascript("history.back()", null);
                } else {
                    onBackPressed();
                }
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
            return true;
        } else {
            return super.onKeyDown(keyCode, event);
        }
    }

    public void onBackPressed() {
        long curTime = System.currentTimeMillis();
        long intervalTime = curTime - backPressedTime;

        long FINISH_INTERVAL_TIME = 2000;
        if (0 <= intervalTime && FINISH_INTERVAL_TIME >= intervalTime) {
            finish();
        } else {
            backPressedTime = curTime;
            Toast.makeText(this, getString(R.string.exit_guide), Toast.LENGTH_SHORT).show();
        }
    }
}
