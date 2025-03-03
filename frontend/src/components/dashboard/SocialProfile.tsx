import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function SocialProfiles() {
  return (
    <div className={`max-w-2xl mx-auto p-4 bg-white dark:bg-slate-950`}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Social Profiles</h1>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="twitter"
                className="block text-base font-medium mb-1.5"
              >
                Twitter
              </Label>
              <Input
                id="twitter"
                type="text"
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <Label
                htmlFor="facebook"
                className="block text-base font-medium mb-1.5"
              >
                Facebook
              </Label>
              <Input
                id="facebook"
                type="text"
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <Label
                htmlFor="figma"
                className="block text-base font-medium mb-1.5"
              >
                Figma
              </Label>
              <Button
                variant="default"
                className="bg-gray-900 text-white dark:text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md px-4 py-2 text-sm font-medium flex items-center gap-2 mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-figma"
                >
                  <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                  <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                  <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                  <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
                  <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
                </svg>
                Connect to Figma
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Not shown on profile. Learn how to{" "}
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Share from Figma
                </a>
                .
              </p>
            </div>

            <div>
              <Label
                htmlFor="instagram"
                className="block text-base font-medium mb-1.5"
              >
                Instagram
              </Label>
              <Input
                id="instagram"
                type="text"
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <Label
                htmlFor="github"
                className="block text-base font-medium mb-1.5"
              >
                GitHub
              </Label>
              <Input
                id="github"
                type="text"
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <Label
                htmlFor="creativeMarket"
                className="block text-base font-medium mb-1.5"
              >
                Creative Market
              </Label>
              <Input
                id="creativeMarket"
                type="text"
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <Label
                htmlFor="codepen"
                className="block text-base font-medium mb-1.5"
              >
                CodePen
              </Label>
              <Input
                id="codepen"
                type="text"
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 mb-2"
              />
              <div className="flex items-center gap-2">
                <Checkbox id="teamAccount" />
                <Label htmlFor="teamAccount" className="text-sm font-normal">
                  This is a team account
                </Label>
              </div>
            </div>

            <div>
              <Label
                htmlFor="medium"
                className="block text-base font-medium mb-1.5"
              >
                Medium
              </Label>
              <Input
                id="medium"
                type="text"
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 mb-2"
              />
              <div className="flex items-center gap-2">
                <Checkbox id="publication" />
                <Label htmlFor="publication" className="text-sm font-normal">
                  This is a publication
                </Label>
              </div>
            </div>

            <div>
              <Label
                htmlFor="behance"
                className="block text-base font-medium mb-1.5"
              >
                Behance
              </Label>
              <Input
                id="behance"
                type="text"
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div>
              <Label
                htmlFor="linkedin"
                className="block text-base font-medium mb-1.5"
              >
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                type="text"
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 mb-2"
              />
              <div className="flex items-center gap-2">
                <Checkbox id="companyAccount" />
                <Label htmlFor="companyAccount" className="text-sm font-normal">
                  This is a company account
                </Label>
              </div>
            </div>

            <div>
              <Label
                htmlFor="vimeo"
                className="block text-base font-medium mb-1.5"
              >
                Vimeo
              </Label>
              <Input
                id="vimeo"
                type="text"
                className="w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white rounded-md px-6 py-2 text-base font-medium"
            >
              Update Social Profiles
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
