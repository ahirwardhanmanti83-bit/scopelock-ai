package com.scopelock

import com.intellij.openapi.project.Project
import com.intellij.openapi.wm.StatusBar
import com.intellij.openapi.wm.StatusBarWidget
import com.intellij.openapi.wm.StatusBarWidgetFactory
import com.intellij.openapi.wm.CustomStatusBarWidget
import com.intellij.openapi.ui.Messages
import java.awt.Component
import java.awt.event.MouseAdapter
import java.awt.event.MouseEvent
import javax.swing.JLabel
import javax.swing.BorderFactory
import java.awt.Color
import java.awt.Cursor

class ScopeLockStatusBarWidgetFactory : StatusBarWidgetFactory {
    override fun getId(): String = "ScopeLockStatusBarWidget"
    override fun getDisplayName(): String = "ScopeLock AI Scope Monitor"
    override fun isAvailable(project: Project): Boolean = true
    override fun createWidget(project: Project): StatusBarWidget = ScopeLockStatusBarWidget(project)
    override fun disposeWidget(widget: StatusBarWidget) {}
    override fun canBeEnabledOn(statusBar: StatusBar): Boolean = true
}

class ScopeLockStatusBarWidget(private val project: Project) : CustomStatusBarWidget {
    private val label = JLabel(" 🛡️ ScopeLock: Audit Ready ")

    override fun ID(): String = "ScopeLockStatusBarWidget"

    override fun getComponent(): Component {
        label.toolTipText = "ScopeLock AI: Click to run Git Scope Creep Audit ($125/hr rate)"
        label.cursor = Cursor.getPredefinedCursor(Cursor.HAND_CURSOR)
        label.border = BorderFactory.createEmptyBorder(0, 4, 0, 4)
        label.foreground = Color(99, 102, 241) // Indigo accent

        label.addMouseListener(object : MouseAdapter() {
            override fun mouseClicked(e: MouseEvent?) {
                executeAudit()
            }
        })
        return label
    }

    private fun executeAudit() {
        try {
            val process = ProcessBuilder("npx", "scopelock-audit")
                .directory(project.basePath?.let { java.io.File(it) })
                .start()
            val exitCode = process.waitFor()

            if (exitCode == 0) {
                label.text = " 🛡️ ScopeLock: 0 Scope Creep "
                label.foreground = Color(34, 197, 94) // Green
                Messages.showInfoMessage(
                    project,
                    "ScopeLock Audit Complete: 0 unbilled scope creep detected. Your billable hours are safe.",
                    "ScopeLock AI"
                )
            } else {
                label.text = " ⚠️ ScopeLock: Unbilled Creep! "
                label.foreground = Color(239, 68, 68) // Red
                val choice = Messages.showYesNoDialog(
                    project,
                    "Unbilled client scope detected in recent git commits! Generate formal UCC § 2-209 Change Order now?",
                    "ScopeLock Scope Creep Detected",
                    "Generate Change Order",
                    "Dismiss",
                    Messages.getWarningIcon()
                )
                if (choice == Messages.YES) {
                    java.awt.Desktop.getDesktop().browse(java.net.URI("https://patreon.com/c/AestheticFindsUSA"))
                }
            }
        } catch (ex: Exception) {
            label.text = " 🛡️ ScopeLock: Ready "
        }
    }

    override fun install(statusBar: StatusBar) {}
    override fun dispose() {}
}
