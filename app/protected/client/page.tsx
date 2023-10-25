import { auth } from "@/auth";
import { Session } from "next-auth";

export default async function Page() {
    const session = await auth()

    return (
        <section className="py-24">
            <div className="container">
                <h2 className="mt-4 font-medium text-emerald-500">Logged in as:</h2>
                {sessionData(session)}
            </div>
        </section>
    );
}

function sessionData(session: Session | null) {
    if (session) {
        const { user } = session;
        if (user) {
            return (
                <ul className="mt-4">
                    {Object.keys(user).map((key) => (
                        <li key={key}>
                            <strong>{key}: </strong>
                            <span className="font-light">
                                {user[key as keyof typeof user]}
                            </span>
                        </li>
                    ))}
                </ul>
            );
        }
    }

    return (
        <p className="mt-4 text-red-500">
            Problem with session, please try again
        </p>
    );
}