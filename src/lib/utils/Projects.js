import { error } from "pdf-lib";

export const getProjectsByUser = async (userId) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/projects`);
        if (res.ok) {
            const data = await res.json();
            return data
        } else {
            console.error('Failed to fetch projects');
            toast.error('Failed to fetch projects', res);
            return error;
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Error fetching projects');
        return;
    }
}