require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-launch-arguments"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["repository"]["baseUrl"]
  s.license      = { :type => package["license"], :file => "LICENSE" }
  s.authors      = { package["author"]["name"] => package["author"]["email"] }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "#{package["repository"]["baseUrl"]}.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  s.requires_arc = true

  install_modules_dependencies(s)

  s.pod_target_xcconfig = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\" \"$(PODS_ROOT)/RCT-Folly\"",
    "DEFINES_MODULE" => "YES",
    "SWIFT_OBJC_INTERFACE_HEADER_NAME" => "$(SWIFT_MODULE_NAME)-Swift.h"
  }

  s.compiler_flags  = '-DRCT_NEW_ARCH_ENABLED'
end
