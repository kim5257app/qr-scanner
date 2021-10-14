package io.kim5257.app.qrscanner

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.annotation.CapacitorPlugin

@CapacitorPlugin(name = "Event")
class EventPlugin: Plugin() {
    fun onFocusChanged(hasFocus: Boolean) {
        notifyListeners("focusChanged", JSObject().also {
            it.put("hasFocus", hasFocus)
        })
    }
}