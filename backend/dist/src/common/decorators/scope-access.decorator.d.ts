export type ScopeResource = 'organization' | 'match' | 'report';
export interface ScopeAccessOptions {
    resource: ScopeResource;
}
export declare const SCOPE_ACCESS_KEY = "scopeAccess";
export declare const ScopeAccess: (options: ScopeAccessOptions) => MethodDecorator & ClassDecorator;
