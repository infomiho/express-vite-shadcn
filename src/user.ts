export type AuthUserData = ReturnType<typeof createUser>;
export type AuthUser = ReturnType<typeof enrichUser>;

export function createUser(name: string) {
	return {
		name,
	};
}

export function enrichUser(user: AuthUserData) {
	return {
		...user,
		getGreeting: () => `Greeting from ${user.name}!`,
	};
}