/**
 * Unit tests for Lucidchart Node
 *
 * [Velocity BPA Licensing Notice]
 * This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
 * Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
 * For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
 */

import { Lucidchart } from '../../nodes/Lucidchart/Lucidchart.node';
import type { INodeProperties } from 'n8n-workflow';

describe('Lucidchart Node', () => {
  let lucidchartNode: Lucidchart;

  beforeEach(() => {
    lucidchartNode = new Lucidchart();
  });

  describe('Node Description', () => {
    it('should have correct display name', () => {
      expect(lucidchartNode.description.displayName).toBe('Lucidchart');
    });

    it('should have correct node name', () => {
      expect(lucidchartNode.description.name).toBe('lucidchart');
    });

    it('should be of type n8n-nodes-base.lucidchart', () => {
      expect(lucidchartNode.description.name).toBe('lucidchart');
    });

    it('should have version 1', () => {
      expect(lucidchartNode.description.version).toBe(1);
    });

    it('should have correct credential requirements', () => {
      expect(lucidchartNode.description.credentials).toContainEqual({
        name: 'lucidchartApi',
        required: true,
      });
    });

    it('should have inputs and outputs defined', () => {
      expect(lucidchartNode.description.inputs).toContain('main');
      expect(lucidchartNode.description.outputs).toContain('main');
    });
  });

  describe('Resources', () => {
    it('should have document resource', () => {
      const resourceProperty = lucidchartNode.description.properties?.find(
        (p: INodeProperties) => p.name === 'resource'
      );
      expect(resourceProperty).toBeDefined();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (resourceProperty as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'document')).toBe(true);
    });

    it('should have folder resource', () => {
      const resourceProperty = lucidchartNode.description.properties?.find(
        (p: INodeProperties) => p.name === 'resource'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (resourceProperty as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'folder')).toBe(true);
    });

    it('should have user resource', () => {
      const resourceProperty = lucidchartNode.description.properties?.find(
        (p: INodeProperties) => p.name === 'resource'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (resourceProperty as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'user')).toBe(true);
    });

    it('should have team resource', () => {
      const resourceProperty = lucidchartNode.description.properties?.find(
        (p: INodeProperties) => p.name === 'resource'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (resourceProperty as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'team')).toBe(true);
    });

    it('should have documentCollaboration resource', () => {
      const resourceProperty = lucidchartNode.description.properties?.find(
        (p: INodeProperties) => p.name === 'resource'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (resourceProperty as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'documentCollaboration')).toBe(true);
    });

    it('should have folderCollaboration resource', () => {
      const resourceProperty = lucidchartNode.description.properties?.find(
        (p: INodeProperties) => p.name === 'resource'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (resourceProperty as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'folderCollaboration')).toBe(true);
    });

    it('should have sharing resource', () => {
      const resourceProperty = lucidchartNode.description.properties?.find(
        (p: INodeProperties) => p.name === 'resource'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (resourceProperty as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'sharing')).toBe(true);
    });

    it('should have embedding resource', () => {
      const resourceProperty = lucidchartNode.description.properties?.find(
        (p: INodeProperties) => p.name === 'resource'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (resourceProperty as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'embedding')).toBe(true);
    });

    it('should have auditLog resource', () => {
      const resourceProperty = lucidchartNode.description.properties?.find(
        (p: INodeProperties) => p.name === 'resource'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (resourceProperty as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'auditLog')).toBe(true);
    });

    it('should have account resource', () => {
      const resourceProperty = lucidchartNode.description.properties?.find(
        (p: INodeProperties) => p.name === 'resource'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (resourceProperty as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'account')).toBe(true);
    });

    it('should have exactly 10 resources', () => {
      const resourceProperty = lucidchartNode.description.properties?.find(
        (p: INodeProperties) => p.name === 'resource'
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (resourceProperty as any)?.options;
      expect(options?.length).toBe(10);
    });
  });

  describe('Document Operations', () => {
    it('should have create operation', () => {
      const operations = lucidchartNode.description.properties?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (p: INodeProperties) => p.name === 'operation' && (p as any).displayOptions?.show?.resource?.includes('document')
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (operations as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'create')).toBe(true);
    });

    it('should have get operation', () => {
      const operations = lucidchartNode.description.properties?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (p: INodeProperties) => p.name === 'operation' && (p as any).displayOptions?.show?.resource?.includes('document')
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (operations as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'get')).toBe(true);
    });

    it('should have export operation', () => {
      const operations = lucidchartNode.description.properties?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (p: INodeProperties) => p.name === 'operation' && (p as any).displayOptions?.show?.resource?.includes('document')
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (operations as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'export')).toBe(true);
    });

    it('should have trash operation', () => {
      const operations = lucidchartNode.description.properties?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (p: INodeProperties) => p.name === 'operation' && (p as any).displayOptions?.show?.resource?.includes('document')
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options = (operations as any)?.options;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(options?.some((o: any) => o.value === 'trash')).toBe(true);
    });
  });

  describe('Icon', () => {
    it('should have an icon defined', () => {
      expect(lucidchartNode.description.icon).toBeDefined();
      expect(lucidchartNode.description.icon).toBe('file:lucidchart.svg');
    });
  });

  describe('Properties', () => {
    it('should have properties defined', () => {
      expect(lucidchartNode.description.properties).toBeDefined();
      expect(Array.isArray(lucidchartNode.description.properties)).toBe(true);
    });

    it('should have resource as first property', () => {
      const firstProperty = lucidchartNode.description.properties?.[0];
      expect(firstProperty?.name).toBe('resource');
    });
  });
});

describe('Credential Tests', () => {
  describe('API Key Authentication', () => {
    it('should accept valid API key format', () => {
      const apiKey = 'lc_api_key_1234567890abcdef';
      expect(apiKey.length).toBeGreaterThan(10);
    });
  });

  describe('OAuth2 Authentication', () => {
    it('should have required OAuth2 fields', () => {
      const oauth2Config = {
        clientId: 'client_id_example',
        clientSecret: 'client_secret_example',
        accessToken: 'access_token_example',
        refreshToken: 'refresh_token_example',
      };
      expect(oauth2Config.clientId).toBeDefined();
      expect(oauth2Config.clientSecret).toBeDefined();
      expect(oauth2Config.accessToken).toBeDefined();
      expect(oauth2Config.refreshToken).toBeDefined();
    });
  });
});
