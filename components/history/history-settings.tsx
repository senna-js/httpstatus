"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useI18n } from "@/hooks/use-i18n"
import { useHistoryStore } from "@/hooks/use-history-store"
import { toast } from "@/components/ui/use-toast"

interface HistorySettingsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HistorySettings({ open, onOpenChange }: HistorySettingsProps) {
  const { t } = useI18n()
  const { settings, updateSettings } = useHistoryStore()

  const [localSettings, setLocalSettings] = useState({
    maxItems: 100,
    groupSimilarDomains: true,
    saveMetadata: true,
    autoDeleteAfterDays: 30,
    enableAutoDelete: false,
  })

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings)
    }
  }, [settings])

  const handleSave = () => {
    updateSettings(localSettings)
    toast({
      title: t("history.settings.saved"),
      description: t("history.settings.saved.description"),
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("history.settings.title")}</DialogTitle>
          <DialogDescription>{t("history.settings.description")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="max-items">{t("history.settings.maxItems")}</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="max-items"
                min={10}
                max={500}
                step={10}
                value={[localSettings.maxItems]}
                onValueChange={(value) => setLocalSettings({ ...localSettings, maxItems: value[0] })}
                className="flex-1"
              />
              <span className="w-12 text-center">{localSettings.maxItems}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t("history.settings.maxItems.description")}</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="group-domains">{t("history.settings.groupDomains")}</Label>
              <p className="text-sm text-muted-foreground">{t("history.settings.groupDomains.description")}</p>
            </div>
            <Switch
              id="group-domains"
              checked={localSettings.groupSimilarDomains}
              onCheckedChange={(checked) => setLocalSettings({ ...localSettings, groupSimilarDomains: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="save-metadata">{t("history.settings.saveMetadata")}</Label>
              <p className="text-sm text-muted-foreground">{t("history.settings.saveMetadata.description")}</p>
            </div>
            <Switch
              id="save-metadata"
              checked={localSettings.saveMetadata}
              onCheckedChange={(checked) => setLocalSettings({ ...localSettings, saveMetadata: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-delete">{t("history.settings.autoDelete")}</Label>
              <p className="text-sm text-muted-foreground">{t("history.settings.autoDelete.description")}</p>
            </div>
            <Switch
              id="auto-delete"
              checked={localSettings.enableAutoDelete}
              onCheckedChange={(checked) => setLocalSettings({ ...localSettings, enableAutoDelete: checked })}
            />
          </div>

          {localSettings.enableAutoDelete && (
            <div className="grid gap-2">
              <Label htmlFor="auto-delete-days">{t("history.settings.autoDeleteDays")}</Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="auto-delete-days"
                  min={1}
                  max={365}
                  step={1}
                  value={[localSettings.autoDeleteAfterDays]}
                  onValueChange={(value) => setLocalSettings({ ...localSettings, autoDeleteAfterDays: value[0] })}
                  className="flex-1"
                />
                <span className="w-12 text-center">{localSettings.autoDeleteAfterDays}</span>
              </div>
              <p className="text-sm text-muted-foreground">{t("history.settings.autoDeleteDays.description")}</p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSave}>{t("common.save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
