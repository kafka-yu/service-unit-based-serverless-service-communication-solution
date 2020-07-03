interface ServiceUnit<ServiceRoutes> {
  serviceRouter: ServiceRouter<ServiceRoutes>;
  // new (serviceRouter: ServiceRouter<ServiceRoutes>): ServiceUnit<ServiceRoutes>;
}

interface ServiceRouter<ServiceRoutes> {
  invoke<TRequest, TResult>(
    serviceRoute: ServiceRoutes,
    request: TRequest
  ): Promise<TResult>;
}

interface ServiceRunner extends ServiceRouter<string> {}

interface ServiceUnitsRegister {}

export { ServiceUnit, ServiceRouter, ServiceRunner, ServiceUnitsRegister };
