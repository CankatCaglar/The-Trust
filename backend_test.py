#!/usr/bin/env python3
"""
ARK Protocol Backend API Testing
Tests all endpoints including wallet verification functionality
"""

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class ARKProtocolTester:
    def __init__(self, base_url="https://sol-address-check.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test_name": name,
            "success": success,
            "details": details,
            "response_data": response_data,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    {details}")
        if not success and response_data:
            print(f"    Response: {response_data}")

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            data = response.json() if success else None
            
            if success and data and data.get("message") == "ARK Protocol API":
                self.log_test("API Root Endpoint", True, f"Status: {response.status_code}", data)
            else:
                self.log_test("API Root Endpoint", False, f"Expected 'ARK Protocol API' message, got: {data}")
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Request failed: {str(e)}")

    def test_wallet_verification_valid(self):
        """Test wallet verification with valid Wrapped SOL address"""
        valid_address = "So11111111111111111111111111111111111111112"
        
        try:
            response = requests.post(
                f"{self.api_url}/verify",
                json={"address": valid_address},
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            success = response.status_code == 200
            data = response.json() if success else None
            
            if success and data:
                # Validate response structure
                required_fields = ["address", "is_valid", "risk_level", "steps", "summary"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if missing_fields:
                    self.log_test("Wallet Verification (Valid)", False, f"Missing fields: {missing_fields}", data)
                elif data["risk_level"] == "safe" and data["is_valid"]:
                    self.log_test("Wallet Verification (Valid)", True, f"Risk: {data['risk_level']}, Valid: {data['is_valid']}", data)
                else:
                    self.log_test("Wallet Verification (Valid)", False, f"Expected safe/valid, got risk: {data['risk_level']}, valid: {data['is_valid']}")
            else:
                self.log_test("Wallet Verification (Valid)", False, f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Wallet Verification (Valid)", False, f"Request failed: {str(e)}")

    def test_wallet_verification_usdc(self):
        """Test wallet verification with USDC address"""
        usdc_address = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        
        try:
            response = requests.post(
                f"{self.api_url}/verify",
                json={"address": usdc_address},
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            success = response.status_code == 200
            data = response.json() if success else None
            
            if success and data:
                if data["risk_level"] == "safe" and data["is_valid"]:
                    self.log_test("Wallet Verification (USDC)", True, f"Risk: {data['risk_level']}, Balance: {data.get('balance')}", data)
                else:
                    self.log_test("Wallet Verification (USDC)", False, f"Expected safe/valid, got risk: {data['risk_level']}, valid: {data['is_valid']}")
            else:
                self.log_test("Wallet Verification (USDC)", False, f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Wallet Verification (USDC)", False, f"Request failed: {str(e)}")

    def test_wallet_verification_risky(self):
        """Test wallet verification with risky address"""
        risky_address = "ScamScamScamScamScamScamScamScamScamScamScam"
        
        try:
            response = requests.post(
                f"{self.api_url}/verify",
                json={"address": risky_address},
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            success = response.status_code == 200
            data = response.json() if success else None
            
            if success and data:
                if data["risk_level"] == "risky":
                    self.log_test("Wallet Verification (Risky)", True, f"Risk: {data['risk_level']}, Summary: {data.get('summary', '')[:50]}...", data)
                else:
                    self.log_test("Wallet Verification (Risky)", False, f"Expected risky, got: {data['risk_level']}")
            else:
                self.log_test("Wallet Verification (Risky)", False, f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Wallet Verification (Risky)", False, f"Request failed: {str(e)}")

    def test_wallet_verification_invalid(self):
        """Test wallet verification with invalid address"""
        invalid_address = "invalid_address_123"
        
        try:
            response = requests.post(
                f"{self.api_url}/verify",
                json={"address": invalid_address},
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            success = response.status_code == 200
            data = response.json() if success else None
            
            if success and data:
                if data["risk_level"] == "invalid" and not data["is_valid"]:
                    self.log_test("Wallet Verification (Invalid)", True, f"Risk: {data['risk_level']}, Valid: {data['is_valid']}", data)
                else:
                    self.log_test("Wallet Verification (Invalid)", False, f"Expected invalid/false, got risk: {data['risk_level']}, valid: {data['is_valid']}")
            else:
                self.log_test("Wallet Verification (Invalid)", False, f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Wallet Verification (Invalid)", False, f"Request failed: {str(e)}")

    def test_verification_steps_structure(self):
        """Test that verification steps have correct structure"""
        test_address = "So11111111111111111111111111111111111111112"
        
        try:
            response = requests.post(
                f"{self.api_url}/verify",
                json={"address": test_address},
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            success = response.status_code == 200
            data = response.json() if success else None
            
            if success and data and "steps" in data:
                steps = data["steps"]
                if len(steps) == 4:
                    # Check each step has required fields
                    step_names = [step.get("name") for step in steps]
                    expected_names = ["AI Pattern Analysis", "On-Chain Scan", "AI Risk Detection", "Terminal Verification"]
                    
                    if step_names == expected_names:
                        self.log_test("Verification Steps Structure", True, f"All 4 steps present with correct names", {"step_count": len(steps), "names": step_names})
                    else:
                        self.log_test("Verification Steps Structure", False, f"Step names mismatch. Expected: {expected_names}, Got: {step_names}")
                else:
                    self.log_test("Verification Steps Structure", False, f"Expected 4 steps, got {len(steps)}")
            else:
                self.log_test("Verification Steps Structure", False, f"No steps in response or request failed")
                
        except Exception as e:
            self.log_test("Verification Steps Structure", False, f"Request failed: {str(e)}")

    def test_stats_endpoint(self):
        """Test stats endpoint"""
        try:
            response = requests.get(f"{self.api_url}/stats", timeout=10)
            success = response.status_code == 200
            data = response.json() if success else None
            
            if success and data:
                required_fields = ["total_verifications", "safe_count", "risky_count", "invalid_count"]
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    self.log_test("Stats Endpoint", True, f"All stats fields present", data)
                else:
                    self.log_test("Stats Endpoint", False, f"Missing fields: {missing_fields}", data)
            else:
                self.log_test("Stats Endpoint", False, f"Status: {response.status_code}", response.text)
                
        except Exception as e:
            self.log_test("Stats Endpoint", False, f"Request failed: {str(e)}")

    def test_status_endpoints(self):
        """Test status check endpoints"""
        try:
            # Test POST status
            post_response = requests.post(
                f"{self.api_url}/status",
                json={"client_name": "test_client"},
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            post_success = post_response.status_code == 200
            post_data = post_response.json() if post_success else None
            
            if post_success and post_data and "id" in post_data:
                self.log_test("Status POST", True, f"Status created with ID: {post_data['id'][:8]}...", {"id": post_data["id"]})
            else:
                self.log_test("Status POST", False, f"Status: {post_response.status_code}", post_response.text)
            
            # Test GET status
            get_response = requests.get(f"{self.api_url}/status", timeout=10)
            get_success = get_response.status_code == 200
            get_data = get_response.json() if get_success else None
            
            if get_success and isinstance(get_data, list):
                self.log_test("Status GET", True, f"Retrieved {len(get_data)} status checks", {"count": len(get_data)})
            else:
                self.log_test("Status GET", False, f"Status: {get_response.status_code}", get_response.text)
                
        except Exception as e:
            self.log_test("Status Endpoints", False, f"Request failed: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting ARK Protocol Backend Tests")
        print(f"🔗 Testing API at: {self.api_url}")
        print("=" * 60)
        
        # Run all tests
        self.test_api_root()
        self.test_wallet_verification_valid()
        self.test_wallet_verification_usdc()
        self.test_wallet_verification_risky()
        self.test_wallet_verification_invalid()
        self.test_verification_steps_structure()
        self.test_stats_endpoint()
        self.test_status_endpoints()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All backend tests passed!")
            return True
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return False

    def get_test_results(self):
        """Get detailed test results"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "test_details": self.test_results
        }

def main():
    tester = ARKProtocolTester()
    success = tester.run_all_tests()
    
    # Save detailed results
    results = tester.get_test_results()
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())