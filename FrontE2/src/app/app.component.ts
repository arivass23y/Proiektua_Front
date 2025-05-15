import { Component } from '@angular/core';
import logError from 'src/utils/logError';

window.onerror = function (msg, url, lineNo, columnNo, error) {
  logError("window.onerror", error || msg);
};

window.addEventListener("unhandledrejection", function (event) {
  logError("Unhandled Promise", event.reason);
});


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
