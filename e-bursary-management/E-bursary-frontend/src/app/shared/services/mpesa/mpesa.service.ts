import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';

const PROXY_BASE = 'https://urchin-app-ycear.ondigitalocean.app';

export interface StkPushPayload {
  phoneNumber: string;   // 254xxxxxxxxx
  amount: number;
  accountReference: string;
  description: string;
  clientId: string;
}

export interface StkPushResponse {
  success: boolean;
  data: {
    checkoutRequestId: string;
    transactionId: string;
  };
}

export interface TransactionStatusResponse {
  success: boolean;
  data: {
    status: 'completed' | 'failed' | 'pending';
    resultDesc: string;
    mpesaReceiptNumber: string;
  };
}

@Injectable({ providedIn: 'root' })
export class MpesaService {
  constructor(private http: HttpClient) {}

  private isOfflineMode(): boolean {
    return environment.offlineMode || (typeof navigator !== 'undefined' && !navigator.onLine);
  }

  private offlineStkPush(): StkPushResponse {
    const checkoutRequestId = `OFFLINE_${Date.now()}`;
    return {
      success: true,
      data: {
        checkoutRequestId,
        transactionId: `OFFLINE_TX_${Date.now()}`,
      },
    };
  }

  private offlineStatus(checkoutRequestId: string): TransactionStatusResponse {
    return {
      success: true,
      data: {
        status: 'completed',
        resultDesc: `Offline mode payment completed for ${checkoutRequestId}`,
        mpesaReceiptNumber: `OFFLINE_${Date.now()}`,
      },
    };
  }

  initiateSTKPush(payload: StkPushPayload): Observable<StkPushResponse> {
    if (this.isOfflineMode()) {
      return of(this.offlineStkPush());
    }

    return this.http.post<StkPushResponse>(`${PROXY_BASE}/mpesa/stk-push`, payload);
  }

  checkTransactionStatus(checkoutRequestId: string): Observable<TransactionStatusResponse> {
    if (this.isOfflineMode()) {
      return of(this.offlineStatus(checkoutRequestId));
    }

    return this.http.get<TransactionStatusResponse>(
      `${PROXY_BASE}/mpesa/transaction/${checkoutRequestId}`,
    );
  }

  /** Format Kenyan phone number to 254xxxxxxxxx */
  formatPhone(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    if (digits.startsWith('0')) return '254' + digits.slice(1);
    if (digits.startsWith('254')) return digits;
    if (digits.startsWith('7') || digits.startsWith('1')) return '254' + digits;
    return digits;
  }
}
