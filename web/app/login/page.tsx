import { login } from "../actions";
import { config } from "@/lib/config";

export default function LoginPage() {
  return (
    <section className="card narrow">
      <h1>Wer liest heute?</h1>
      <form action={login} className="stack">
        {config.users.map((name) => (
          <button key={name} name="user" value={name} className="big">
            {name}
          </button>
        ))}
      </form>
    </section>
  );
}
