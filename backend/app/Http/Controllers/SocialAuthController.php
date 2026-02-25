<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class SocialAuthController extends Controller
{
    // STEP 1 — Redirect to Google
    public function redirect()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    // STEP 2 — Handle Google Callback
    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();
        } catch (\Exception $e) {
            return redirect(env('FRONTEND_URL') . '/login?error=google_auth_failed');
        }

        // Find existing user or create new one
        /** @var User $user */
        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name'              => $googleUser->getName(),
                'email'             => $googleUser->getEmail(),
                'password'          => bcrypt(Str::random(24)), // random password
                'google_id'         => $googleUser->getId(),
                'avatar'            => $googleUser->getAvatar(),
                'email_verified_at' => now(), // Google emails are already verified
            ]
        );

        // If user exists but never linked Google — update google_id
        if (!$user->google_id) {
            $user->update([
                'google_id' => $googleUser->getId(),
                'avatar'    => $googleUser->getAvatar(),
            ]);
        }

        // Create Sanctum token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Redirect to React frontend with token
        return redirect(env('FRONTEND_URL') . '/auth/google/success?token=' . $token);
    }
}
