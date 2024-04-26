import { Button } from "@/components/ui/button";
import { useState } from "react";
import SuperJSON from "superjson";
import type { AuthUser, AuthUserData } from "../main";
import { enrichUser } from "../user";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from "./components/ui/card";
import { Loader2 } from "lucide-react";

// Fetch from localhost:3000/get-user and set it into state
// but deserialize with SuperJSON

async function fetchUser(): Promise<AuthUser> {
	const response = await fetch("http://localhost:3000/get-user");

	const user = SuperJSON.deserialize<AuthUserData>(await response.json());
	return enrichUser(user);
}

function App() {
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState<AuthUser | null>(null);

	async function fetchAndSetUser() {
		try {
			setIsLoading(true);
			setUser(null);
			const user = await fetchUser();
			setUser(user);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex flex-col gap-4">
				<h1 className="text-3xl">SuperJSON test</h1>
				<div>
					<Button onClick={fetchAndSetUser} disabled={isLoading}>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Click me
					</Button>
				</div>
				{user && (
					<Card>
						<CardHeader>
							<CardTitle>{user.name}</CardTitle>
							<CardDescription>This is the user</CardDescription>
						</CardHeader>
						<CardContent>
							<p>{user.getGreeting()}</p>
						</CardContent>
						<CardFooter>
							<p>Card Footer</p>
						</CardFooter>
					</Card>
				)}
			</div>
		</div>
	);
}

export default App;
