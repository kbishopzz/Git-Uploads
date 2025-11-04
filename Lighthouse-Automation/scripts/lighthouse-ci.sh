#!/bin/bash

# 🚀 Lighthouse CI Automation Script
# Comprehensive testing and monitoring for the Lighthouse Tailwind project

set -e

echo "🎯 Starting Lighthouse CI Automation Suite..."
echo "=============================================="

# Configuration
BASE_URL="http://localhost:3000"
PAGES=(
    ""
    "/features.html"
    "/pricing.html"
    "/testimonials.html"
    "/contact.html"
)

PAGE_NAMES=(
    "Landing Page"
    "Features"
    "Pricing"
    "Testimonials"
    "Contact"
)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if server is running
check_server() {
    print_status "Checking if development server is running..."
    if curl -f "$BASE_URL" > /dev/null 2>&1; then
        print_success "Server is running at $BASE_URL"
        return 0
    else
        print_error "Server is not running at $BASE_URL"
        return 1
    fi
}

# Function to start server if not running
start_server() {
    if ! check_server; then
        print_status "Starting development server..."
        npm start &
        SERVER_PID=$!
        
        # Wait for server to start
        for i in {1..30}; do
            if check_server; then
                print_success "Server started successfully"
                return 0
            fi
            sleep 1
        done
        
        print_error "Failed to start server after 30 seconds"
        return 1
    fi
}

# Function to run lighthouse audits
run_lighthouse_audits() {
    print_status "Running Lighthouse CI audits..."
    
    mkdir -p reports/lighthouse
    
    for i in "${!PAGES[@]}"; do
        local page="${PAGES[$i]}"
        local name="${PAGE_NAMES[$i]}"
        local url="${BASE_URL}${page}"
        
        print_status "Auditing: $name ($url)"
        
        lighthouse "$url" \
            --output=json \
            --output-path="reports/lighthouse/${name,,}.json" \
            --chrome-flags="--headless --no-sandbox" \
            --quiet
        
        print_success "Completed audit for $name"
    done
}

# Function to run accessibility tests
run_accessibility_tests() {
    print_status "Running accessibility tests..."
    
    mkdir -p reports/accessibility
    
    # Install tools if not present
    if ! command -v axe &> /dev/null; then
        print_status "Installing axe-core CLI..."
        npm install -g @axe-core/cli
    fi
    
    if ! command -v pa11y-ci &> /dev/null; then
        print_status "Installing pa11y-ci..."
        npm install -g pa11y-ci
    fi
    
    # Run axe tests
    print_status "Running axe-core accessibility tests..."
    for i in "${!PAGES[@]}"; do
        local page="${PAGES[$i]}"
        local name="${PAGE_NAMES[$i]}"
        local url="${BASE_URL}${page}"
        
        print_status "Testing accessibility: $name"
        axe "$url" --save "reports/accessibility/axe-${name,,}.json" || print_warning "Axe found issues in $name"
    done
    
    # Run pa11y tests
    print_status "Running pa11y accessibility tests..."
    pa11y-ci --config .pa11yci || print_warning "pa11y found accessibility issues"
}

# Function to analyze performance
analyze_performance() {
    print_status "Analyzing performance metrics..."
    
    mkdir -p reports/performance
    
    # Check bundle sizes
    echo "📊 Bundle Size Analysis" > reports/performance/bundle-analysis.txt
    echo "======================" >> reports/performance/bundle-analysis.txt
    echo "" >> reports/performance/bundle-analysis.txt
    
    if [ -f "dist/output.css" ]; then
        local css_size=$(wc -c < dist/output.css)
        local css_size_kb=$((css_size / 1024))
        local gzipped_size=$(gzip -c dist/output.css | wc -c)
        local gzipped_size_kb=$((gzipped_size / 1024))
        
        echo "CSS Bundle:" >> reports/performance/bundle-analysis.txt
        echo "  - Uncompressed: ${css_size_kb}KB" >> reports/performance/bundle-analysis.txt
        echo "  - Gzipped: ${gzipped_size_kb}KB" >> reports/performance/bundle-analysis.txt
        echo "" >> reports/performance/bundle-analysis.txt
        
        # Performance budget checks
        if [ $css_size_kb -gt 100 ]; then
            print_warning "CSS bundle size (${css_size_kb}KB) exceeds 100KB budget"
            echo "⚠️ CSS bundle exceeds budget" >> reports/performance/bundle-analysis.txt
        else
            print_success "CSS bundle size (${css_size_kb}KB) within budget"
            echo "✅ CSS bundle within budget" >> reports/performance/bundle-analysis.txt
        fi
    else
        print_error "CSS bundle not found. Run 'npm run build' first."
    fi
}

# Function to generate comprehensive report
generate_report() {
    print_status "Generating comprehensive report..."
    
    local report_file="reports/lighthouse-ci-report-$(date +%Y%m%d-%H%M%S).md"
    
    echo "# 🚀 Lighthouse CI Automation Report" > "$report_file"
    echo "Generated on: $(date)" >> "$report_file"
    echo "" >> "$report_file"
    
    echo "## 📊 Pages Audited" >> "$report_file"
    for name in "${PAGE_NAMES[@]}"; do
        echo "- ✅ $name" >> "$report_file"
    done
    echo "" >> "$report_file"
    
    echo "## 🔍 Testing Tools Used" >> "$report_file"
    echo "- 🏃‍♂️ Lighthouse: Performance, accessibility, SEO, and best practices" >> "$report_file"
    echo "- ♿ axe-core: Accessibility testing" >> "$report_file"
    echo "- 🔍 pa11y: Accessibility validation" >> "$report_file"
    echo "" >> "$report_file"
    
    if [ -f "reports/performance/bundle-analysis.txt" ]; then
        echo "## 📦 Performance Analysis" >> "$report_file"
        cat "reports/performance/bundle-analysis.txt" >> "$report_file"
        echo "" >> "$report_file"
    fi
    
    echo "## 🎯 Quality Targets" >> "$report_file"
    echo "- Performance Score: ≥ 85%" >> "$report_file"
    echo "- Accessibility Score: ≥ 95%" >> "$report_file"
    echo "- Best Practices Score: ≥ 90%" >> "$report_file"
    echo "- SEO Score: ≥ 90%" >> "$report_file"
    echo "- CSS Bundle Size: ≤ 100KB" >> "$report_file"
    echo "" >> "$report_file"
    
    echo "## 📁 Report Files" >> "$report_file"
    echo "- Lighthouse Reports: \`reports/lighthouse/\`" >> "$report_file"
    echo "- Accessibility Reports: \`reports/accessibility/\`" >> "$report_file"
    echo "- Performance Analysis: \`reports/performance/\`" >> "$report_file"
    
    print_success "Report generated: $report_file"
}

# Function to cleanup
cleanup() {
    if [ ! -z "$SERVER_PID" ]; then
        print_status "Stopping development server..."
        kill $SERVER_PID 2>/dev/null || true
    fi
}

# Main execution
main() {
    # Set up cleanup trap
    trap cleanup EXIT
    
    # Check if we're in the right directory
    if [ ! -f "package.json" ]; then
        print_error "package.json not found. Please run this script from the project root."
        exit 1
    fi
    
    # Build the project
    print_status "Building project..."
    npm run build
    
    # Start server
    start_server
    
    # Create reports directory
    mkdir -p reports
    
    # Run all tests
    run_lighthouse_audits
    run_accessibility_tests
    analyze_performance
    generate_report
    
    print_success "🎉 Lighthouse CI automation completed successfully!"
    print_status "Check the 'reports' directory for detailed results."
}

# Run main function
main "$@"