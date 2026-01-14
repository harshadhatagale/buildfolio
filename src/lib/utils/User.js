export const syncUser = async (user) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/${user.id}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.fullName,
                    email: user.emailAddresses[0].emailAddress,
                }),
            }
        );

        if (!res.ok) throw new Error("Failed to sync user");

        const data = await res.json();
        return data
    } catch (err) {
        console.error("User sync error:", err);
        throw err;
    }
};