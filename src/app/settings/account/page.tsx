import { Separator } from "@/components/ui/separator"
import AccountSettingsForm from "./account-settings-form"
import AuthUser from "@/app/auth/auth-user"

export default async function AccountSettings() {
    const { userData } = await AuthUser()

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Account Settings</h3>
                <p className="text-sm text-muted-foreground">
                    You can manage your account settings here
                </p>
            </div>
            <Separator />
            <AccountSettingsForm
                username={userData!.username}
                isPublic={userData!.public}
            />
        </div>
    )
}