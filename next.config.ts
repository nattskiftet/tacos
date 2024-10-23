import {withKumaUI} from '@kuma-ui/next-plugin';

const nextConfig = withKumaUI({reactStrictMode: true}, {wasm: true});

export default nextConfig;
