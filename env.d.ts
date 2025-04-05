declare namespace Cloudflare {
    interface Env {
        DB: D1Database;
    }
}

interface CloudflareEnv extends Cloudflare.Env {}