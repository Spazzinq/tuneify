import { auth } from "@/app/auth";

export default function Page() {
    return (
        <section className="py-24">
            <div className="container">
                <h2 className="mt-4 font-medium text-emerald-500">Logged in as:</h2>
                {generateListFromSession()}
            </div>
        </section>
    );
}

async function generateListFromSession() {
    const session = await auth();

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