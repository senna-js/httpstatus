"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Settings } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useSettings } from "@/hooks/use-settings"
import { ThemeSwitcher } from "./theme-switcher"
import { useI18n } from "@/hooks/use-i18n"

export function SettingsDialog({ showButton = true }: { showButton?: boolean }) {
  const [open, setOpen] = useState(false)
  const { setTheme } = useTheme()
  const { settings, updateSettings } = useSettings()
  const { t } = useI18n()

  const handleSave = () => {
    toast({
      title: t("settings.title"),
      description: t("settings.saved"),
    })
    setOpen(false)
  }

  return (
    <>
      {showButton && (
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          <Settings className="h-4 w-4 mr-2" />
          {t("settings.title")}
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("settings.title")}</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="appearance">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="appearance">{t("settings.tabs.appearance")}</TabsTrigger>
              <TabsTrigger value="display">{t("settings.tabs.display")}</TabsTrigger>
              <TabsTrigger value="behavior">{t("settings.tabs.behavior")}</TabsTrigger>
            </TabsList>

            <TabsContent value="appearance" className="space-y-4 mt-4">
              <div>
                <h3 className="text-sm font-medium mb-3">{t("settings.theme")}</h3>
                <ThemeSwitcher />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">{t("settings.colorScheme")}</h3>
                <RadioGroup
                  defaultValue={settings.colorScheme}
                  onValueChange={(value) => updateSettings({ colorScheme: value as "default" | "green" | "purple" })}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="color-default" />
                    <Label htmlFor="color-default">{t("settings.colors.default")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="green" id="color-green" />
                    <Label htmlFor="color-green">{t("settings.colors.green")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="purple" id="color-purple" />
                    <Label htmlFor="color-purple">{t("settings.colors.purple")}</Label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="display" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-headers">{t("settings.showHeaders")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.showHeaders.desc")}</p>
                  </div>
                  <Switch
                    id="show-headers"
                    checked={settings.showHeaders}
                    onCheckedChange={(checked) => updateSettings({ showHeaders: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-redirect-chain">{t("settings.showRedirectChain")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.showRedirectChain.desc")}</p>
                  </div>
                  <Switch
                    id="show-redirect-chain"
                    checked={settings.showRedirectChain}
                    onCheckedChange={(checked) => updateSettings({ showRedirectChain: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-view">{t("settings.compactView")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.compactView.desc")}</p>
                  </div>
                  <Switch
                    id="compact-view"
                    checked={settings.compactView}
                    onCheckedChange={(checked) => updateSettings({ compactView: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-status-description">{t("settings.showStatusDescription")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.showStatusDescription.desc")}</p>
                  </div>
                  <Switch
                    id="show-status-description"
                    checked={settings.showStatusDescription}
                    onCheckedChange={(checked) => updateSettings({ showStatusDescription: checked })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="behavior" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-check-canonical">{t("settings.autoCheckCanonical")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.autoCheckCanonical.desc")}</p>
                  </div>
                  <Switch
                    id="auto-check-canonical"
                    checked={settings.autoCheckCanonical}
                    onCheckedChange={(checked) => updateSettings({ autoCheckCanonical: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-protocol">{t("settings.autoAddProtocol")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.autoAddProtocol.desc")}</p>
                  </div>
                  <Switch
                    id="auto-protocol"
                    checked={settings.autoAddProtocol}
                    onCheckedChange={(checked) => updateSettings({ autoAddProtocol: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-save-history">{t("settings.autoSaveHistory")}</Label>
                    <p className="text-sm text-muted-foreground">{t("settings.autoSaveHistory.desc")}</p>
                  </div>
                  <Switch
                    id="auto-save-history"
                    checked={settings.autoSaveHistory}
                    onCheckedChange={(checked) => updateSettings({ autoSaveHistory: checked })}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">{t("settings.defaultUserAgent")}</h3>
                  <RadioGroup
                    defaultValue={settings.defaultUserAgent}
                    onValueChange={(value) =>
                      updateSettings({ defaultUserAgent: value as "default" | "googlebot" | "bingbot" | "mobile" })
                    }
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="agent-default" />
                      <Label htmlFor="agent-default">{t("checker.userAgents.browser")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="googlebot" id="agent-googlebot" />
                      <Label htmlFor="agent-googlebot">{t("checker.userAgents.googlebot")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bingbot" id="agent-bingbot" />
                      <Label htmlFor="agent-bingbot">{t("checker.userAgents.bingbot")}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mobile" id="agent-mobile" />
                      <Label htmlFor="agent-mobile">{t("checker.userAgents.mobile")}</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {t("settings.buttons.cancel")}
            </Button>
            <Button onClick={handleSave}>{t("settings.buttons.save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
