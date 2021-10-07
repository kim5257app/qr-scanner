package io.kim5257.app.qrscanner;

import android.annotation.TargetApi;
import android.os.Build;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class WrapWebViewClient extends WebViewClient {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        if (view.canGoBack()) {
            view.loadUrl(url);
            return true;
        }

        return false;
    }

    @TargetApi(Build.VERSION_CODES.N)
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        if (request.isRedirect()) {
            view.loadUrl(request.getUrl().toString());
            return true;
        }

        return false;
    }
}
