"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isResetMode) {
      // TODO: Implement password reset logic
      console.log("Reset password for:", email);
      setIsResetMode(false);
    } else {
      // TODO: Implement login logic
      console.log("Login with:", { email, password });
      // Navigate to admin dashboard
      router.push("/km/admin/dashboard");
      onClose();
    }
  };

  const handleForgotPassword = () => {
    setIsResetMode(true);
    setPassword("");
  };

  const handleBackToLogin = () => {
    setIsResetMode(false);
    setPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white border border-gray-200 shadow-lg rounded-xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-center font-khmer text-gray-900">
            {isResetMode ? t("auth.resetPassword") : t("auth.login")}
          </DialogTitle>
          <DialogDescription className="text-center font-khmer text-gray-600">
            {isResetMode ? t("auth.resetPasswordDescription") : t("auth.loginDescription")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="font-khmer text-gray-700">
              {t("auth.email")}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="font-khmer border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
              required
            />
          </div>
          {!isResetMode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-khmer text-gray-700">
                  {t("auth.password")}
                </Label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-emerald-600 hover:text-emerald-500 font-khmer transition-colors hover:underline cursor-pointer"
                >
                  {t("auth.forgotPassword")}
                </button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-khmer border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 cursor-pointer"
                required
              />
            </div>
          )}
          {isResetMode && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-sm text-emerald-600 hover:text-emerald-500 font-khmer transition-colors hover:underline cursor-pointer"
              >
                {t("auth.backToLogin")}
              </button>
            </div>
          )}
          <DialogFooter>
            <Button 
              type="submit" 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-khmer py-2 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
            >
              {isResetMode ? t("common.sendResetLink") : t("auth.login")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 