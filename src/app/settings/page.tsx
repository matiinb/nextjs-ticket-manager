import { Separator } from "@/components/ui/separator"
import ProfileSettingsForm from "./profile/profile-settings-form"
import AuthUser from "@/app/auth/auth-user"

export const dynamic = 'force-dynamic'

export default async function ProfileSettings() {
    const { userData } = await AuthUser()

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profile Settings</h3>
                <p className="text-sm text-muted-foreground">
                    You can manage your profile here
                </p>
            </div>

            <Separator />
            <ProfileSettingsForm
                fname={userData!.profile!.firstName}
                lname={userData!.profile!.lastName}
            />
        </div>
    )
}