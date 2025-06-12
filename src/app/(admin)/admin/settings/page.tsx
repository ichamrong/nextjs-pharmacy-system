"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const { t } = useLanguage()
  const [settings, setSettings] = useState({
    general: {
      pharmacyName: "My Pharmacy",
      address: "123 Main St, City",
      phone: "+1234567890",
      email: "contact@mypharmacy.com",
      currency: "USD",
      timezone: "UTC+7",
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      lowStockAlerts: true,
      orderNotifications: true,
      marketingEmails: false,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: "30",
      passwordExpiry: "90",
      loginAttempts: "5",
    },
    backup: {
      autoBackup: true,
      backupFrequency: "daily",
      backupTime: "02:00",
      retentionPeriod: "30",
      cloudStorage: false,
    },
  })

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving settings:", settings)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t("settings.title")}</h1>
        <p className="text-gray-500">{t("settings.description")}</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t("settings.pharmacyInfo")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("settings.emailNotifications")}</TabsTrigger>
          <TabsTrigger value="security">{t("settings.passwordSettings")}</TabsTrigger>
          <TabsTrigger value="backup">{t("settings.backupSettings")}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.pharmacyInfo")}</CardTitle>
              <CardDescription>{t("settings.pharmacyInfoDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pharmacyName">{t("settings.pharmacyName")}</Label>
                  <Input
                    id="pharmacyName"
                    placeholder={t("settings.pharmacyNamePlaceholder")}
                    value={settings.general.pharmacyName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, pharmacyName: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">{t("settings.pharmacyAddress")}</Label>
                  <Input
                    id="address"
                    placeholder={t("settings.pharmacyAddressPlaceholder")}
                    value={settings.general.address}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, address: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("settings.pharmacyPhone")}</Label>
                  <Input
                    id="phone"
                    placeholder={t("settings.pharmacyPhonePlaceholder")}
                    value={settings.general.phone}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, phone: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("settings.pharmacyEmail")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("settings.pharmacyEmailPlaceholder")}
                    value={settings.general.email}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        general: { ...settings.general, email: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.emailNotifications")}</CardTitle>
              <CardDescription>{t("settings.emailNotificationsDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.lowStockAlerts")}</Label>
                    <p className="text-sm text-gray-500">
                      {t("settings.lowStockAlertsDescription")}
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.lowStockAlerts}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, lowStockAlerts: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.orderNotifications")}</Label>
                    <p className="text-sm text-gray-500">
                      {t("settings.orderNotificationsDescription")}
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.orderNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, orderNotifications: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.systemUpdates")}</Label>
                    <p className="text-sm text-gray-500">
                      {t("settings.systemUpdatesDescription")}
                    </p>
                  </div>
                  <Switch
                    checked={settings.notifications.marketingEmails}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, marketingEmails: checked },
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.passwordSettings")}</CardTitle>
              <CardDescription>{t("settings.passwordSettingsDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.twoFactorAuth")}</Label>
                    <p className="text-sm text-gray-500">
                      {t("settings.twoFactorAuthDescription")}
                    </p>
                  </div>
                  <Switch
                    checked={settings.security.twoFactorAuth}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        security: { ...settings.security, twoFactorAuth: checked },
                      })
                    }
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">{t("settings.currentPassword")}</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">{t("settings.newPassword")}</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t("settings.confirmPassword")}</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.backupSettings")}</CardTitle>
              <CardDescription>{t("settings.backupSettingsDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{t("settings.autoBackup")}</Label>
                    <p className="text-sm text-gray-500">
                      {t("settings.autoBackupDescription")}
                    </p>
                  </div>
                  <Switch
                    checked={settings.backup.autoBackup}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        backup: { ...settings.backup, autoBackup: checked },
                      })
                    }
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="backupFrequency">{t("settings.backupFrequency")}</Label>
                    <Select
                      value={settings.backup.backupFrequency}
                      onValueChange={(value) =>
                        setSettings({
                          ...settings,
                          backup: { ...settings.backup, backupFrequency: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("settings.selectFrequency")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">{t("settings.hourly")}</SelectItem>
                        <SelectItem value="daily">{t("settings.daily")}</SelectItem>
                        <SelectItem value="weekly">{t("settings.weekly")}</SelectItem>
                        <SelectItem value="monthly">{t("settings.monthly")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  {t("settings.createBackup")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave}>{t("settings.saveChanges")}</Button>
      </div>
    </div>
  )
} 