import {
  ServiceRouter,
  ServiceUnit,
  ServiceRunner,
  ServiceResponse,
} from "../src/infrastructure";

interface ServiceRequest {
  server: string;
}

interface ScheduleMeetingRequestType {
  title: string;
  date: Date;
}

interface ScheduleMeetingResponseType {
  id: string;
  url: string;
}

type MeetingServiceRoutes = "schedule" | "getList";
type ClassServiceRoutes = "getList" | "create";

type CalendarServiceRoutes = "createEvent";

class MeetingServiceUnit implements ServiceUnit<MeetingServiceRoutes> {
  serviceRouter: ServiceRouter<MeetingServiceRoutes>;
  constructor(svcProvider: ServiceRouter<MeetingServiceRoutes>) {
    this.serviceRouter = svcProvider;
  }

  async schedule(
    request: ScheduleMeetingRequestType
  ): Promise<ServiceResponse<ScheduleMeetingResponseType>> {
    return await this.serviceRouter.invoke("schedule", request);
  }
}

class ClassServiceUnit implements ServiceUnit<ClassServiceRoutes> {
  serviceRouter: ServiceRouter<ClassServiceRoutes>;

  constructor(serviceRouter: ServiceRouter<ClassServiceRoutes>) {
    this.serviceRouter = serviceRouter;
  }

  async getList(request: ServiceRequest) {
    return await this.serviceRouter.invoke("getList", request);
  }
}

class CalendarServiceUnit implements ServiceUnit<CalendarServiceRoutes> {
  constructor(public serviceRouter: ServiceRouter<CalendarServiceRoutes>) {}

  createEvent() {
    // this.serviceRouter.invoke("createEvent");
    return Promise.resolve({ ok: true });
  }
}

class LambdaFunctionRunner implements ServiceRunner {
  private _lambdaFnServiceRoutesMapping: { [k: string]: string };
  constructor() {
    this._lambdaFnServiceRoutesMapping = {
      "": "",
    };
  }

  invoke<TRequest, TResult>(
    serviceRoute: string,
    request: TRequest
  ): Promise<TResult> {
    // invoke lambda function
    const lambdaPath = this._lambdaFnServiceRoutesMapping[serviceRoute];
    console.log("serviceRoute", serviceRoute, request);
    // invoke(lambdaPath);
    return Promise.resolve({} as TResult);
  }
}

class HttpClientRunner implements ServiceRunner {
  invoke<TRequest, TResult>(url: string, request: TRequest): Promise<TResult> {
    // await httpClient.get('url');
    return Promise.resolve({} as TResult);
  }
}

class ServiceUnitsRegister implements ServiceUnitsRegister {
  meeting: MeetingServiceUnit;
  class: ClassServiceUnit;
  calendar: CalendarServiceUnit;

  constructor(serviceRunner: ServiceRunner) {
    // lambda
    this.meeting = new MeetingServiceUnit(serviceRunner);
    this.class = new ClassServiceUnit(serviceRunner);
  }
}

const ServiceUnits = new ServiceUnitsRegister(new LambdaFunctionRunner());

export { ServiceUnits, ServiceUnitsRegister };
