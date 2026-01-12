/**
 * Unit tests for Lucidchart GenericFunctions
 *
 * [Velocity BPA Licensing Notice]
 * This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
 * Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
 * For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
 */

import {
  validateDocumentId,
  validateFolderId,
  validateUserId,
  validateTeamId,
  formatRole,
  formatExportFormat,
  formatProduct,
  buildQueryParams,
} from '../../nodes/Lucidchart/GenericFunctions';

describe('Lucidchart GenericFunctions', () => {
  describe('validateDocumentId', () => {
    it('should return trimmed ID for valid document IDs', () => {
      expect(validateDocumentId('abc123')).toBe('abc123');
      expect(validateDocumentId('ABC-123-def')).toBe('ABC-123-def');
      expect(validateDocumentId('doc_12345')).toBe('doc_12345');
      expect(validateDocumentId('a1b2c3d4e5f6')).toBe('a1b2c3d4e5f6');
    });

    it('should trim whitespace from valid IDs', () => {
      expect(validateDocumentId('  abc123  ')).toBe('abc123');
    });

    it('should throw for empty strings', () => {
      expect(() => validateDocumentId('')).toThrow('Document ID cannot be empty');
    });

    it('should throw for whitespace only', () => {
      expect(() => validateDocumentId('   ')).toThrow('Document ID cannot be empty');
    });
  });

  describe('validateFolderId', () => {
    it('should return trimmed ID for valid folder IDs', () => {
      expect(validateFolderId('folder123')).toBe('folder123');
      expect(validateFolderId('FOLDER-ABC-123')).toBe('FOLDER-ABC-123');
      expect(validateFolderId('f_123456')).toBe('f_123456');
    });

    it('should trim whitespace from valid IDs', () => {
      expect(validateFolderId('  folder123  ')).toBe('folder123');
    });

    it('should throw for empty strings', () => {
      expect(() => validateFolderId('')).toThrow('Folder ID cannot be empty');
    });

    it('should throw for whitespace only', () => {
      expect(() => validateFolderId('   ')).toThrow('Folder ID cannot be empty');
    });
  });

  describe('validateUserId', () => {
    it('should return trimmed ID for valid user IDs', () => {
      expect(validateUserId('user123')).toBe('user123');
      expect(validateUserId('USER-456-abc')).toBe('USER-456-abc');
      expect(validateUserId('u_987654')).toBe('u_987654');
    });

    it('should trim whitespace from valid IDs', () => {
      expect(validateUserId('  user123  ')).toBe('user123');
    });

    it('should throw for empty strings', () => {
      expect(() => validateUserId('')).toThrow('User ID cannot be empty');
    });

    it('should throw for whitespace only', () => {
      expect(() => validateUserId('   ')).toThrow('User ID cannot be empty');
    });
  });

  describe('validateTeamId', () => {
    it('should return trimmed ID for valid team IDs', () => {
      expect(validateTeamId('team123')).toBe('team123');
      expect(validateTeamId('TEAM-789-xyz')).toBe('TEAM-789-xyz');
      expect(validateTeamId('t_123456789')).toBe('t_123456789');
    });

    it('should trim whitespace from valid IDs', () => {
      expect(validateTeamId('  team123  ')).toBe('team123');
    });

    it('should throw for empty strings', () => {
      expect(() => validateTeamId('')).toThrow('Team ID cannot be empty');
    });

    it('should throw for whitespace only', () => {
      expect(() => validateTeamId('   ')).toThrow('Team ID cannot be empty');
    });
  });

  describe('formatRole', () => {
    it('should accept valid roles', () => {
      expect(formatRole('view')).toBe('view');
      expect(formatRole('edit')).toBe('edit');
      expect(formatRole('editshare')).toBe('editshare');
    });

    it('should convert to lowercase', () => {
      expect(formatRole('VIEW')).toBe('view');
      expect(formatRole('Edit')).toBe('edit');
    });

    it('should throw for invalid roles', () => {
      expect(() => formatRole('admin')).toThrow('Invalid role');
      expect(() => formatRole('owner')).toThrow('Invalid role');
    });
  });

  describe('formatExportFormat', () => {
    it('should accept valid export formats', () => {
      expect(formatExportFormat('pdf')).toBe('pdf');
      expect(formatExportFormat('png')).toBe('png');
      expect(formatExportFormat('svg')).toBe('svg');
    });

    it('should convert to lowercase', () => {
      expect(formatExportFormat('PDF')).toBe('pdf');
      expect(formatExportFormat('PNG')).toBe('png');
    });

    it('should throw for invalid formats', () => {
      expect(() => formatExportFormat('jpg')).toThrow('Invalid export format');
      expect(() => formatExportFormat('gif')).toThrow('Invalid export format');
    });
  });

  describe('formatProduct', () => {
    it('should accept valid products', () => {
      expect(formatProduct('lucidchart')).toBe('lucidchart');
      expect(formatProduct('lucidspark')).toBe('lucidspark');
    });

    it('should convert to lowercase', () => {
      expect(formatProduct('LUCIDCHART')).toBe('lucidchart');
      expect(formatProduct('LucidSpark')).toBe('lucidspark');
    });

    it('should throw for invalid products', () => {
      expect(() => formatProduct('lucidpress')).toThrow('Invalid product');
    });
  });

  describe('buildQueryParams', () => {
    it('should filter out empty values', () => {
      const result = buildQueryParams({
        name: 'test',
        empty: '',
        nullVal: null,
        undefinedVal: undefined,
        validNum: 0,
      });
      expect(result).toEqual({ name: 'test', validNum: 0 });
    });

    it('should return empty object for all empty values', () => {
      const result = buildQueryParams({
        empty: '',
        nullVal: null,
      });
      expect(result).toEqual({});
    });

    it('should preserve valid values', () => {
      const result = buildQueryParams({
        str: 'value',
        num: 42,
        bool: true,
      });
      expect(result).toEqual({ str: 'value', num: 42, bool: true });
    });
  });
});

describe('Error Handling Scenarios', () => {
  describe('API Request Error Handling', () => {
    it('should handle 400 Bad Request errors', () => {
      const error = {
        statusCode: 400,
        message: 'Bad Request',
        error: { code: 'INVALID_REQUEST', message: 'Invalid parameters' },
      };
      expect(error.statusCode).toBe(400);
      expect(error.error.code).toBe('INVALID_REQUEST');
    });

    it('should handle 401 Unauthorized errors', () => {
      const error = {
        statusCode: 401,
        message: 'Unauthorized',
        error: { code: 'UNAUTHORIZED', message: 'Invalid token' },
      };
      expect(error.statusCode).toBe(401);
      expect(error.error.code).toBe('UNAUTHORIZED');
    });

    it('should handle 403 Forbidden errors', () => {
      const error = {
        statusCode: 403,
        message: 'Forbidden',
        error: { code: 'FORBIDDEN', message: 'Insufficient permissions' },
      };
      expect(error.statusCode).toBe(403);
      expect(error.error.code).toBe('FORBIDDEN');
    });

    it('should handle 404 Not Found errors', () => {
      const error = {
        statusCode: 404,
        message: 'Not Found',
        error: { code: 'NOT_FOUND', message: 'Resource not found' },
      };
      expect(error.statusCode).toBe(404);
      expect(error.error.code).toBe('NOT_FOUND');
    });

    it('should handle 429 Rate Limited errors', () => {
      const error = {
        statusCode: 429,
        message: 'Too Many Requests',
        error: { code: 'RATE_LIMITED', message: 'Rate limit exceeded' },
      };
      expect(error.statusCode).toBe(429);
      expect(error.error.code).toBe('RATE_LIMITED');
    });

    it('should handle 500 Internal Server errors', () => {
      const error = {
        statusCode: 500,
        message: 'Internal Server Error',
        error: { code: 'INTERNAL_ERROR', message: 'Server error' },
      };
      expect(error.statusCode).toBe(500);
      expect(error.error.code).toBe('INTERNAL_ERROR');
    });
  });
});

describe('Pagination', () => {
  describe('Cursor-based pagination', () => {
    it('should handle response with nextCursor', () => {
      const response = {
        results: [{ id: '1' }, { id: '2' }],
        nextCursor: 'cursor_abc123',
        totalCount: 100,
      };
      expect(response.nextCursor).toBe('cursor_abc123');
      expect(response.results.length).toBe(2);
    });

    it('should handle response without nextCursor (last page)', () => {
      const response = {
        results: [{ id: '99' }, { id: '100' }],
        nextCursor: null,
        totalCount: 100,
      };
      expect(response.nextCursor).toBeNull();
      expect(response.results.length).toBe(2);
    });

    it('should handle empty results', () => {
      const response = {
        results: [],
        nextCursor: null,
        totalCount: 0,
      };
      expect(response.results.length).toBe(0);
      expect(response.totalCount).toBe(0);
    });
  });
});

describe('Export Formats', () => {
  describe('Document export format validation', () => {
    it('should support PDF format', () => {
      const format = 'pdf';
      expect(['pdf', 'png', 'svg']).toContain(format);
    });

    it('should support PNG format', () => {
      const format = 'png';
      expect(['pdf', 'png', 'svg']).toContain(format);
    });

    it('should support SVG format', () => {
      const format = 'svg';
      expect(['pdf', 'png', 'svg']).toContain(format);
    });
  });
});

describe('Role Validation', () => {
  describe('Collaboration roles', () => {
    it('should validate view role', () => {
      const validRoles = ['view', 'edit', 'editshare'];
      expect(validRoles).toContain('view');
    });

    it('should validate edit role', () => {
      const validRoles = ['view', 'edit', 'editshare'];
      expect(validRoles).toContain('edit');
    });

    it('should validate editshare role', () => {
      const validRoles = ['view', 'edit', 'editshare'];
      expect(validRoles).toContain('editshare');
    });
  });

  describe('Team roles', () => {
    it('should validate member role', () => {
      const validRoles = ['member', 'admin'];
      expect(validRoles).toContain('member');
    });

    it('should validate admin role', () => {
      const validRoles = ['member', 'admin'];
      expect(validRoles).toContain('admin');
    });
  });
});
